import React, { useState, useEffect, useRef } from "react";
import "./muskan.css";

const TripDetail = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRefs = useRef([]);

  const trip1Images = [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
  ];
  
  const trip2Images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=1200&q=80"
  ];
  
  const trip3Images = [
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          } else {
            entry.target.style.opacity = '0.4';
            entry.target.style.transform = 'translateY(-20px) scale(0.9)';
          }
        });
      },
      { threshold: 0.3 }
    );

    containerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page" style={{scrollBehavior: 'smooth'}}>
      <div className="trip-container" ref={(el) => containerRefs.current[0] = el} style={{opacity: 0, transform: 'translateY(50px) scale(0.9)', transition: 'all 0.6s ease'}}>
        {/* Left side */}
        <div>
          <img
            src={trip1Images[currentImageIndex]}
            alt="Palm City Villa"
            className="hero-img"
          />

          <h2 className="title">Palm City Villa</h2>
          <p className="desc">
            Experience luxury living in Palm City Villa 🌴 — nestled near the
            Corniche with stunning sea views. Enjoy private pools, elegant
            interiors, and easy access to vibrant nightlife and cultural
            attractions.
          </p>

          <div className="gallery">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80" />
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80" />
            <img src= "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=500&q=80"/>
          </div>
        </div>

        {/* Right side */}
        <div className="booking-card">
          <h3>
            $1,200 <span>/night</span>
          </h3>

          <div className="form-input">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-input">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-input">
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>

          <button className="booking-btn">Book Now</button>

          <div className="rating">⭐ 4.8 (128 reviews)</div>

          <div className="amenities">
            <h4>Amenities</h4>
            <ul>
              <li>🏊 Pool</li>
              <li>🍳 Free breakfast</li>
              <li>🛎 Room service</li>
              <li>🎬 Open Cinema</li>
              <li>🚗 Parking</li>
              <li>🛜 Wi-Fi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Second Trip - Image on Right */}
      <div className="trip-container reverse" ref={(el) => containerRefs.current[1] = el} style={{opacity: 0, transform: 'translateY(50px) scale(0.9)', transition: 'all 0.6s ease'}}>
        <div className="booking-card">
          <h3>
            $850 <span>/night</span>
          </h3>
          <div className="form-input">
            <input type="date" />
          </div>
          <div className="form-input">
            <input type="date" />
          </div>
          <div className="form-input">
            <input type="number" min="1" defaultValue="2" />
          </div>
          <button className="booking-btn">Book Now</button>
          <div className="rating">⭐ 4.6 (95 reviews)</div>
          <div className="amenities">
            <h4>Amenities</h4>
            <ul>
              <li>🏔 Mountain View</li>
              <li>🔥 Fireplace</li>
              <li>🛁 Hot Tub</li>
              <li>🚗 Parking</li>
              <li>🛜 Wi-Fi</li>
            </ul>
          </div>
        </div>
        <div>
          <img
            src={trip2Images[currentImageIndex]}
            alt="Mountain Retreat"
            className="hero-img"
          />
          <h2 className="title">Mountain Retreat</h2>
          <p className="desc">
            Escape to our cozy Mountain Retreat 🏔 — surrounded by pristine nature and breathtaking views. Perfect for hiking enthusiasts and those seeking tranquility away from city life.
          </p>
          <div className="gallery">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80" />
            <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=500&q=80" />
            <img src="https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=500&q=80" />
          </div>
        </div>
      </div>

      {/* Third Trip - Image on Left */}
      <div className="trip-container" ref={(el) => containerRefs.current[2] = el} style={{opacity: 0, transform: 'translateY(50px) scale(0.9)', transition: 'all 0.6s ease'}}>
        <div>
          <img
            src={trip3Images[currentImageIndex]}
            alt="Urban Loft"
            className="hero-img"
          />
          <h2 className="title">Urban Loft</h2>
          <p className="desc">
            Stay in the heart of the city at our modern Urban Loft 🏙 — featuring contemporary design, rooftop access, and walking distance to top restaurants and entertainment venues.
          </p>
          <div className="gallery">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80" />
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80" />
            <img src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=500&q=80" />
          </div>
        </div>
        <div className="booking-card">
          <h3>
            $650 <span>/night</span>
          </h3>
          <div className="form-input">
            <input type="date" />
          </div>
          <div className="form-input">
            <input type="date" />
          </div>
          <div className="form-input">
            <input type="number" min="1" defaultValue="2" />
          </div>
          <button className="booking-btn">Book Now</button>
          <div className="rating">⭐ 4.7 (156 reviews)</div>
          <div className="amenities">
            <h4>Amenities</h4>
            <ul>
              <li>🏙 City View</li>
              <li>🏋 Gym Access</li>
              <li>☕ Coffee Bar</li>
              <li>🚗 Valet Parking</li>
              <li>🛜 High-Speed Wi-Fi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetail;