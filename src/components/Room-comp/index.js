import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import RedRoom from '../../images/redroom.jpeg';
// import PurpleRoom from '../../images/purpleroom.jpeg';
import GreenRoom from '../../images/greenroom.jpeg';

import Slickcarousel from '../image-gallery-carousel';

import { FaCheck } from 'react-icons/fa';

import './style.scss';

const Roomcomponent = () => {
    return ( 
        <Container fluid className='room-comp-container'>
            <Row className='my-5 room-brief mx-2'>
                <Col sm className='brief py-3'>
                    <span>Beds</span>
                    <p>Double Bed</p>
                </Col>
                <Col sm className='brief py-3'>
                    <span>Room Size</span>
                    <p>Beds</p>
                </Col>
                <Col sm className='brief py-3'>
                    <span>Occupancy</span>
                    <p>2 Adults</p>
                </Col>
                <Col sm className='brief py-3'>
                    <span>Bathroom</span>
                    <p>1 Shower Bath</p>
                </Col>
                <Col sm md={3} lg={3} className='price-container py-4'>
                    <div>
                        <span className='price'>Price</span> <span className='amt'>ZAR 250</span> <span className='night'> / Night</span>
                    </div>
                </Col>
            </Row>
            <Slickcarousel/>
            <Container className='room-desc-container'>
                <Row className='my-5'>
                    <Col className='inner-desc-container py-4'>
                        <h3 className='room-desc-text-head pb-1'>Room Description</h3>
                        <div className='desc-text pt-4'>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                                minima nesciunt dolorem!
                            </p>

                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                                minima nesciunt dolorem!
                            </p>
                        </div>

                    </Col>
                    <Col md={4} lg={3} className='px-0'>
                        <div className='check-form px-3 py-4'>

                            <h4 className='header-text pb-3'>Check Availability</h4>

                            <Form action="#" method="POST">
                                <Row className='form'>
                                    <Col className="form-sect my-3" lg={12} md={12}>
                                        <Form.Control className="form-items py-3" type="date" name="checkin"/>
                                    </Col>
                                    <Col className="form-sect my-3" lg={12} md={12}>
                                        <Form.Control className="form-items py-3" type="date" name="checkout"/>
                                    </Col>
                                    <Col className="form-sect my-3" lg={12} md={12}>
                                        <Form.Select className="form-items py-3" aria-label="Default select example">
                                            <option>Adult</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </Form.Select>
                                    </Col>
                                    <Col className="form-sect my-3" lg={12} md={12}>
                                        <Form.Select className="form-items py-3" aria-label="Default select example">
                                            <option>Children</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </Form.Select>
                                    </Col>
                                    <Col className="form-btn my-2" lg={12} md={12}>
                                        <button className="cssbuttons-io">
                                            <span> Check Availability </span>
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        
                    </Col>
                </Row>

                <Row className='my-5'>
                    <Col xs={{order:1}} md={{ span:8, order: 1}} lg={9} xl={9} xxl={9} className='amenities-container mb-3'>
                        <Row>
                            <Col lg={5} id='amenities-left' className='mb-3'>
                                <div className='amenities-list-container p-3'>
                                    <h4 className='amenities-text-header pb-3'>Amenities</h4>
                                    <ul>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>Kitchen</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>Washing Machine</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>Private Bathroom</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>BBQ Facilities</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>Parking Area</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='amenities-icon'/></span><span>Shared Lounge</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </Col>
                            <Col lg={7} className='mb-3'>
                                <div className='amenities-img'>
                                    <img fluid src={GreenRoom} width="100%" height="420px" alt="" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{order:3}} md={{ span:4, order: 2}} lg={3} xl={3} xxl={3} className='discover-container mb-3 px-0'>
                        <h4 className='header-text pb-3'>Discover Our Rooms</h4>
                        <Row className='img-grid-container px-0 my-3'>
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="" >
                                    <img fluid src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col> 
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="">
                                    <img src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col>
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="">
                                    <img src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col>
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="">
                                    <img src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col>
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="">
                                    <img src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col>
                            <Col className='img-grid mb-3' lg={6}>
                                <a href="">
                                    <img src={GreenRoom} width="100%" alt=""/>
                                </a>
                            </Col>

                            <div class="grid-img-container">
                                <div class="grid-item">
                                    <a href="">
                                        <img src={GreenRoom} width="100%" alt=""/>
                                    </a>
                                </div>
                                <div class="grid-item">
                                    <a href="">
                                        <img src={GreenRoom} width="100%" alt=""/>
                                    </a>
                                </div>
                                <div class="grid-item">
                                    <a href="">
                                        <img src={GreenRoom} width="100%" alt=""/>
                                    </a></div>  
                                <div class="grid-item">
                                    <a href="">
                                        <img src={GreenRoom} width="100%" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </Row>
                    </Col>
                    
                    <Col xs={{order:2}} md={{ span:8, order: 3}} lg={9} xl={9} xxl={9} className='room-services-container mb-3'>
                    <Row>
                            <Col lg={{ span:7, order: 1}} xs={{ span:12, order: 2}} md={{ order: 2}} className='mb-3'>
                                <div className='room-services-img'>
                                    <img fluid src={GreenRoom} width="100%" height="420px" alt="" />
                                </div>
                            </Col>
                            <Col lg={{ span:5, order: 2}} xs={{ span:12, order: 1}} md={{ order: 1}} id='services-right' className='mb-3'>
                                <div className='services-list-container p-3'>
                                    <h4 className='services-text-header pb-3'>Services</h4>
                                    <ul>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span> Daily Cleaning</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span>Inhouse Cook</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span>Laundry</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span>Entertainment Services</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span>Swimming Pool</span>
                                        </li>
                                        <li>
                                            <span className='span-icon-container'><FaCheck className='services-icon'/></span><span>Free Wifi</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{order:4}} md={{ span:4, order: 4}} lg={3} xl={3} xxl={3} className='help-container mb-3 px-0'>
                        <div className='help-card'>
                            <h4>How Can We <br/> Help You?</h4>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum!
                            </p>

                            <button className="cssbuttons-io">
                                <span> Contact Us </span>
                            </button>
                        </div>
                        
                    </Col>
                </Row>
            </Container>

        </Container>
     );
}
 
export default Roomcomponent;