import React from 'react';
import './AboutPage.css';
import hotelVideo from './video.mp4';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <section className="heading">
                <video autoPlay loop className="video-background" muted playsInline>
                    <source src={hotelVideo} type="video/mp4" />
                </video>

                <center>
                    <div className="welcome-msg">
                        <h1>About StayEase Hotels</h1>
                        <p>
                            StayEase Hotels is an Indian hospitality chain of leased and franchised hotels, homes, and living spaces.
                            StayEase initially consisted mainly of budget hotels. The startup expanded
                            globally with thousands of hotels, vacation homes, and millions of rooms in India, Malaysia, UAE, Nepal, China,
                            Brazil, Mexico, UK, Philippines, Japan, Saudi Arabia, Sri Lanka, Indonesia, Vietnam, the United States, and more.

                            Nestled beside an 18-hole golf course minutes from the slopes, Hotel Park City is consistently acclaimed among the best hotels
                            in Park City, Utah. Among our most recent accolades, our AAA Four Diamond resort has proudly been rated a “Top Ski Hotel” by Conde
                            Nast Traveler, and our Ruth’s Chris Steak House is the #1 rated Ruth’s Chris Steak House in the western U.S.
                        </p>
                        <Link to="/browse-all-rooms" className="btn btn-book btna"> Book Room </Link>
                        <Link to="/home" className="btn btn-home btna"> Return to Home </Link>
                    </div>
                </center>
            </section>
        </div>
    );
};

export default About;
