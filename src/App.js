// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar';
import Footer from './components/Footer';


import Homepage from './pages/HomePage';
import Rooms from './pages/Rooms';
import Aboutus from './pages/AboutUs';
import Booking from './pages/Bookings';
import Contact from './pages/ContactUs';
import Blog from './pages/Blog';
import Services from './pages/Services-page';
import Properties from './pages/Properties';
import Room from './pages/Room';
import Checkout from './pages/Checkout';
import HotelsSearch from './pages/HotelsSearch';

import { Helmet } from 'react-helmet-async';


function App() {
  return (
    <Router>
      <Helmet>
        <title>Book My Stay</title>
      </Helmet>
      <Container fluid className='px-0 mx-0'>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/rooms" element={<Rooms />} />
          <Route exact path="/about" element={<Aboutus />} />
          <Route exact path="/booking" element={<Booking />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/properties" element={<Properties />} />
          <Route exact path="/room" element={<Room />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route path="/hotels-search" element={<HotelsSearch />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
