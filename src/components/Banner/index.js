import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

// import roomImg1 from '../../images/room1.jpg';
import roomImg2 from '../../images/room2.jpg';

import { useCountry } from '../../context/countryContext';
import countries from '../../utils/Countries'

// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { FaUser, FaChild, FaCalendarDay, FaMapMarkerAlt } from 'react-icons/fa';
import { IoBed } from 'react-icons/io5';
import './style.scss';
import { useGetListOfCitiesQuery, useGetListOfDistrictsQuery, useGetListOfHotelsQuery, useGetHotelsBySearchQuery, useGetHotelsByLocationQuery } from '../../services/bookingApi';

import { useGetCurrencyRatesQuery } from '../../services/currencyApi';

const Banner = () => {
    // const today = new Date().toISOString().split('T')[0];
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add 1 day to the current date
    const tomorrow = today.toISOString().split('T')[0];
    const [formData, setFormData] = useState({ checkInDate: tomorrow, checkOutDate: '', adults: '', children: '', rooms: '', locationDetails: null });
    const [location, setLocation] = useState('');
    const [inputId, setInputId] = useState('');
    const [inputType, setInputType] = useState('');
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const suggestionsContainerRef = useRef(null);
    const [visibleSuggestions, setVisibleSuggestions] = useState([]);
    const [searchParams, setSearchParams] = useState(null);
    const { country } = useCountry();

    const countryCode = countries.result.find((item) => item.name === country);

    const districtsParams = {
        country: countryCode?.country || 'Nigeria',
    };

    const citiesParams = {
        country: countryCode?.country || 'Nigeria',
    };

    const hotelsParams = {
        country: countryCode?.country || 'Nigeria',
    };

    const currencyParams = {
        output: 'JSON',
        base: 'USD'
    }

    const { data: cityList, refetch: refetchCities } = useGetListOfCitiesQuery(citiesParams);
    const { data: districtList, refetch: refetchDistricts } = useGetListOfDistrictsQuery(districtsParams);
    const { data: hotelsList, refetch: refetchListOfHotels } = useGetListOfHotelsQuery(hotelsParams);
    const navigate = useNavigate();
    const { data: currencyData } = useGetCurrencyRatesQuery(currencyParams);

    const [errors, setErrors] = useState({
        location: '',
        checkInDate: '',
        checkOutDate: '',
        adults: '',
        rooms: ''
    });

    const BATCH_SIZE = 5; // Number of suggestions to load at a time

    useEffect(() => {
        const loadSuggestionsBatch = () => {
            const remainingSuggestions = suggestions.slice(visibleSuggestions.length);
            const nextBatch = remainingSuggestions.slice(0, BATCH_SIZE);
            setVisibleSuggestions(prevVisibleSuggestions => [...prevVisibleSuggestions, ...nextBatch]);
        };

        loadSuggestionsBatch();
    }, [suggestions]);

    // Close the suggestions list when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsContainerRef.current &&
                !suggestionsContainerRef.current.contains(event.target)) {
                setVisibleSuggestions([]);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const locationParams = {
        name: location,
        locale: 'en-gb'
    };

    const { data: locationData } = useGetHotelsByLocationQuery(locationParams)

    const destId = locationData?.[0].dest_id;

    const { data: searchResult, isSuccess, isFetching, isLoading, refetch: refetchHotels } = useGetHotelsBySearchQuery(searchParams);

    const cities = cityList?.result || [];
    const districts = districtList?.result || [];
    const hotels = hotelsList?.result || [];

    // Filter the data based on the condition nr_hotels !== 0
    const filteredCities = cities?.filter(city => city.nr_hotels !== 0);
    const cityIdsWithHotels = filteredCities?.map(city => city.city_id);

    const cityInfo = filteredCities?.map(city => ({
        id: city.city_id,
        name: city.name,
        number_hotels: city.nr_hotels,
        type: 'city',
    }));

    const districtInfo = districts?.map(district => ({
        id: district.district_id,
        name: district.name,
        number_hotels: district.nr_hotels,
        type: 'district',
    }))

    // Filter hotels data based on city_ids present in cityInfo
    const hotelsInfo = hotels?.filter(hotel => cityIdsWithHotels.includes(hotel.city_id))?.map(hotel => ({
        id: hotel.hotel_id,
        name: hotel.name,
        type: 'hotel',
    }));

    // const combinedOptions = [...cityInfo, ...districtInfo, ...hotelsInfo]

    const combinedOptions = useMemo(() => {
        return [...cityInfo, ...districtInfo, ...hotelsInfo];
    }, [cityInfo, districtInfo, hotelsInfo]);

    useEffect(() => {
        if (combinedOptions.length === 0) {
            refetchCities();
            refetchDistricts();
            refetchListOfHotels();
        }
    }, [combinedOptions]);

    useEffect(() => {

        const fetchData = async () => {
            try {

                const response = await refetchHotels();

                await new Promise((resolve) => setTimeout(resolve, 2000));

                if (response.isSuccess && response.data) {

                    const searchData = {
                        checkInDate: formData.checkInDate,
                        checkOutDate: formData.checkOutDate,
                        adults: formData.adults,
                        children: formData.children,
                        rooms: formData.rooms,
                        location: location,
                        locationDetails: selectedInfo,
                        countryCode: countryCode.country,
                    };

                    const encodedSearchData = encodeURIComponent(JSON.stringify(searchData));

                    navigate(`/hotels-search?searchResult=${encodedSearchData}`, {
                        state: {
                            searchFormData: searchData,
                            searchResult: response.data, //searchResult,
                            suggestions: combinedOptions,
                        },
                    });

                } else {
                    console.log('Search result is undefined. Cannot proceed without it.');
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchData();
    }, [searchParams]);

    const { checkInDate, checkOutDate, adults, children, rooms, locationDetails } = formData

    const handleInputChangeTwo = (event) => {
        const value = event.target.value;
        setLocation(value);
        setErrors(prevErrors => ({ ...prevErrors, location: '' }));

        // const matchingSuggestion = visibleSuggestions.find(
        //     (suggestion) => suggestion.name.toLowerCase() === value.toLowerCase()
        // );

        // if (matchingSuggestion) {
        //     setLocation(matchingSuggestion.name);
        //     setErrors((prevErrors) => ({ ...prevErrors, location: '' }));
        // } else {
        //     // If there is no match, you can choose to clear the location or keep it as it is
        //     setLocation('');
        // }

        const filteredSuggestions = combinedOptions?.filter(suggestion =>
            suggestion.name.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
        setVisibleSuggestions([]);
    };

    const handleSuggestionClick = (selectedId, selectedName, selectedType) => {
        setLocation(selectedName.toString()); // selectedName
        setInputId(selectedId.toString()); //selectedId
        setInputType(selectedType.toString()); //selectedType
        setSelectedInfo({ id: selectedId, name: selectedName, type: selectedType }); // Store selected info
        setSuggestions([]); // Clear suggestions after selecting one
        setVisibleSuggestions([]); // Close the suggestions list
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));

        // if (checkInDate > checkOutDate) {
        //     setFormData({ ...formData, checkOutDate: checkOutDate })
        // }

    };

    const isCheckOutValid = () => checkOutDate > checkInDate;

    const validateInputs = () => {
        let validationPassed = true;
        const newErrors = { location: '', checkInDate: '', checkOutDate: '', adults: '', rooms: '' };

        if (!location.trim()) {
            newErrors.location = 'Location is required';
            validationPassed = false;
        }

        if (!checkOutDate.trim()) {
            newErrors.checkOutDate = 'Check Out Date is required';
            validationPassed = false;
        } else if (!isCheckOutValid()) {
            newErrors.checkOutDate = 'Check out date cannot be before or same as check in date';
            validationPassed = false;
        }

        if (Number(adults) < 1) {
            newErrors.adults = 'Field is required';
            validationPassed = false;
        }

        if (Number(rooms) < 1) {
            newErrors.rooms = 'Field is required';
            validationPassed = false;
        }

        setErrors(newErrors);
        return validationPassed;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (validateInputs()) {

            const baseParams = {
                checkin_date: formData.checkInDate,
                dest_type: selectedInfo.type,
                units: 'metric',
                checkout_date: formData.checkOutDate,
                adults_number: formData.adults,
                order_by: 'popularity',
                dest_id: destId,
                filter_by_currency: 'USD',
                locale: 'en-gb',
                room_number: formData.rooms,
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
                include_adjacency: 'true',
            };

            if (formData.children) {
                baseParams.children_number = formData.children;
                baseParams.children_ages = '5,0';
            };

            setSearchParams(baseParams);


        } else {
            console.log('cannot proceed without filling search');
        }
    };

    return (
        <Container fluid className='banner px-0' style={{ position: 'relative' }}>

            <img
                className="banner-img"
                src={roomImg2}
                alt="banner image"
            />

            <div className="overlay">
                <div className='overlay-text'>
                    <Stack>

                    </Stack>
                    <h2>Enjoy Your Stay, <br /> With No Worries</h2>
                    <p>Welcome to BookMyStay hotel booking website, where we make your travel experience easier and hassle free. With our platform you can find the perfect accommodation for your stay.</p>
                </div>
            </div>

            <Container className='form-container my-5'>
                <Form className='px-0'>
                    <Row className='form mx-1 px-2'>
                        <Col className="form-sect mb-3 mt-3 destination-container" lg md={6} >
                            <Form.Label className='label'><FaMapMarkerAlt className='form-icons' /> Location</Form.Label>
                            <div className="autocomplete-container">
                                <Form.Control
                                    type="text"
                                    className="autocomplete-input"
                                    placeholder="Enter a destination..."
                                    value={location}
                                    name='location'
                                    onChange={handleInputChangeTwo}
                                    required
                                    style={errors.location ? { border: "2px solid red" } : {}}
                                />
                                {errors.location && <p className="error-message">{errors.location}</p>}
                                {visibleSuggestions.length > 0 && (
                                    <ul ref={suggestionsContainerRef} className="suggestions-list">
                                        {visibleSuggestions.map((suggestion, index) => (
                                            <li
                                                key={suggestion.id}
                                                className="suggestion"
                                                onClick={() => handleSuggestionClick(suggestion.id, suggestion.name, suggestion.type)}
                                                style={{
                                                    borderBottom: index !== visibleSuggestions.length - 1 ? '1px solid #ccc' : 'none',
                                                }}
                                            >
                                                {suggestion.type === 'hotel' ? <IoBed /> : <FaMapMarkerAlt />}&nbsp;{suggestion.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Col>
                        <Col className="form-sect mb-3 mt-3" lg md={6}>
                            <Form.Label className='label'><FaCalendarDay className='form-icons' /> Check-In</Form.Label>
                            <Form.Control type="date" name="checkInDate" required onChange={handleChangeInput} value={checkInDate} min={tomorrow} style={errors.checkInDate ? { border: "2px solid red" } : {}} />
                            {errors.checkInDate && <p className="error-message">{errors.checkInDate}</p>}
                        </Col>
                        <Col className="form-sect mb-3 mt-3" lg md={6}>
                            <Form.Label className='label'><FaCalendarDay className='form-icons' /> Check-Out</Form.Label>
                            <Form.Control type="date" name="checkOutDate" required onChange={handleChangeInput} value={checkOutDate} min={checkInDate} style={errors.checkOutDate ? { border: "2px solid red" } : {}} />
                            {errors.checkOutDate && <p className="error-message">{errors.checkOutDate}</p>}
                        </Col>
                        <Col className="select-container mb-3 mt-3" lg={3} md={9}>
                            <div>
                                <Form.Label className='label'><FaUser className='form-icons' /> Adult</Form.Label>
                                <Form.Select aria-label="Default select example" name='adults' required onChange={handleChangeInput} value={adults} style={errors.adults ? { border: "2px solid red" } : {}}>
                                    {Array.from({ length: 11 }, (_, index) => (
                                        <option key={index} value={index}>{index}</option>
                                    ))}
                                </Form.Select>
                                {errors.adults && <p className="error-message">{errors.adults}</p>}
                            </div>
                            <div>
                                <Form.Label className='label'><FaChild className='form-icons' /> Kids</Form.Label>
                                <Form.Select aria-label="Default select example" name='children' required onChange={handleChangeInput} value={children}>
                                    {Array.from({ length: 11 }, (_, index) => (
                                        <option key={index} value={index}>{index}</option>
                                    ))}
                                </Form.Select>
                            </div>
                            <div>
                                <Form.Label className='label'><IoBed className='form-icons' /> Room</Form.Label>
                                <Form.Select aria-label="Default select example" name='rooms' required onChange={handleChangeInput} value={rooms} style={errors.rooms ? { border: "2px solid red" } : {}}>
                                    {Array.from({ length: 11 }, (_, index) => (
                                        <option key={index} value={index}>{index}</option>
                                    ))}
                                </Form.Select>
                                {errors.rooms && <p className="error-message">{errors.rooms}</p>}
                            </div>
                        </Col>
                        <Col className="form-btn pt-3 mb-3 mt-3" lg md={3}>
                            <button className="cssbuttons-io" onClick={handleSubmit}>
                                <span>{isFetching ? 'Searching' : 'Search'}</span>
                            </button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}

export default Banner;