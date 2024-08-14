import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';  // Ensure this import is present
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind, faGlassMartiniAlt, faParking, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FaBicycle, FaSwimmingPool } from "react-icons/fa";
import gallery from "../../asset/images/gallery2.png";
import "./facilities.css";

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);
  const navigate = useNavigate();  // Correctly using the useNavigate hook

  // Function to handle search results
  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  const handleButtonClick = () => {
    navigate('/rooms');  // Navigate to the /rooms route
  };

  return (
    <div className="home">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="header-banner">
          <div className="overlay"></div>
          <div className="overlay-content">
            <h1>
              Discover <span className="hotel-color">Luxury and Comfort</span>
            </h1>
            <h4>Your Perfect Getaway Awaits</h4>
          </div>
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
      <RoomSearch handleSearchResult={handleSearchResult} />
      <RoomResult roomSearchResults={roomSearchResults} />
      
      <h2 className="featured-room-heading">Explore Rooms</h2>
      

      {/* OFFER BLOCK */}
      <section className="vacation-offer-block">
    <div className="vacation-offer-bgbanner">
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-sm-6 col-xs-12">
                    <div className="vacation-offer-details">
                        <h1>Your Vacation Awaits</h1>
                        <h4>Escape to luxury and comfort. Whether you're looking for adventure or relaxation.</h4>
                        <button type="button" className="btn btn-default" onClick={handleButtonClick}>
                            Book Now 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


      {/* GALLERY SECTION */}
      <h2 className="featured-room-heading">Our Gallery</h2>
      <section className="image-gallery">
        <img src={gallery} alt="Hotel Gallery" className="gallery-image" />
      </section>

      {/* FACILITIES AREA */}
      <section className="facilities_area section_gap">
        <div className="overlay bg-parallax"></div>
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_w">StayEase Services</h2>
            <p>Who are in extremely love with eco friendly system.</p>
          </div>
          <div className="row mb_30">
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FontAwesomeIcon icon={faWifi} /> WiFi
                </h4>
                <p>Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FaBicycle /> Sports Club
                </h4>
                <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FaSwimmingPool /> Swimming Pool
                </h4>
                <p>Usage of the Internet is becoming more common due to rapid advancement of technology and power.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FontAwesomeIcon icon={faWind} /> Air Conditioning
                </h4>
                <p>Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FontAwesomeIcon icon={faGlassMartiniAlt} /> Mini Bar
                </h4>
                <p>Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="facilities_item">
                <h4 className="sec_h4">
                  <FontAwesomeIcon icon={faParking} /> Parking
                </h4>
                <p>We offer on-site parking for your convenience. Please inquire about valet parking options if available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
