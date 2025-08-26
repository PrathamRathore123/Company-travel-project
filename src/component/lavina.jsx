
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './lavina.css';

const TOUR_PACKAGES = [
  {
    id: 1,
    title: "Bali Paradise",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=600&fit=crop",
    price: "$1,299",
    duration: "7 Days",
    description: "Experience the magical beauty of Bali with pristine beaches, ancient temples, and lush rice terraces.",
    highlights: ["Ubud Rice Terraces", "Temple Tours", "Beach Activities", "Cultural Shows"]
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    price: "$2,199",
    duration: "10 Days",
    description: "Discover breathtaking mountain landscapes, charming villages, and world-class skiing in the Swiss Alps.",
    highlights: ["Mountain Hiking", "Scenic Train Rides", "Alpine Villages", "Snow Activities"]
  },
  {
    id: 3,
    title: "Tokyo Explorer",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=600&fit=crop",
    price: "$1,899",
    duration: "8 Days",
    description: "Immerse yourself in the vibrant culture of Tokyo, from traditional temples to modern skyscrapers.",
    highlights: ["Temple Visits", "Sushi Making", "City Tours", "Shopping Districts"]
  },
  {
    id: 4,
    title: "Santorini Sunset",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=600&fit=crop",
    price: "$1,599",
    duration: "6 Days",
    description: "Witness stunning sunsets, explore white-washed villages, and enjoy the crystal-clear waters of Santorini.",
    highlights: ["Sunset Views", "Wine Tasting", "Beach Relaxation", "Village Tours"]
  }
];

const MobileMockup = React.memo(({ activePackage }) => (
  <div className="mobile-mockup">
    <div className="mobile-frame">
      <div className="mobile-screen">
        <img 
          src={activePackage.image} 
          alt={activePackage.title}
          className="mobile-image"
        />
        <div className="mobile-overlay">
          <h3>{activePackage.title}</h3>
          <p>{activePackage.price}</p>
        </div>
      </div>
    </div>
  </div>
));

const PackageCard = React.memo(({ pkg, index }) => (
  <article className="package-card">
    <div className="card-number">{String(index + 1).padStart(2, '0')}</div>
    
    <header className="card-header">
      <div className="title-section">
        <h2>{pkg.title}</h2>
        <p className="description">{pkg.description}</p>
      </div>
      
      <div className="price-section">
        <div className="price">{pkg.price}</div>
        <div className="duration">{pkg.duration}</div>
      </div>
    </header>
    
    <div className="card-content">
      <div className="highlights">
        <h3>What's Included</h3>
        <div className="highlights-grid">
          {pkg.highlights.map((highlight, idx) => (
            <div key={idx} className="highlight-item">
              <span className="highlight-icon">→</span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card-actions">
        <button className="book-now-btn">Reserve Now</button>
        <button className="details-btn">View Details</button>
      </div>
    </div>
  </article>
));

const TourPackage = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activePackage = useMemo(() => 
    TOUR_PACKAGES[activeImageIndex], [activeImageIndex]
  );

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const newIndex = Math.floor(scrollPosition / (windowHeight * 0.8));
    setActiveImageIndex(Math.min(newIndex, TOUR_PACKAGES.length - 1));
  }, []);

  useEffect(() => {
    let timeoutId;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 16);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return (
    <div className="tour-package-container">
      <MobileMockup activePackage={activePackage} />
      
      <div className="content-section">
        {TOUR_PACKAGES.map((pkg, index) => (
          <PackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TourPackage;