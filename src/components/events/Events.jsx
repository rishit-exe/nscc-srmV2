import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import './Events.css';
import eventData from './events.json';
import oneWebp from './events-img/one.webp';
import twoPng from './events-img/two.png';
import threeWebp from './events-img/three.webp';
import fourWebp from './events-img/four.webp';
import fiveWebp from './events-img/five.webp';

// Map event IDs to imported images
const getEventImage = (eventId) => {
  const imageMap = {
    1: oneWebp,
    2: twoPng,
    3: threeWebp,
    4: fourWebp,
    5: fiveWebp
  };
  return imageMap[eventId] || eventData.find(event => event.id === eventId)?.imageUrl;
};

const Events = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileCarousel />;
  } else {
    return <DesktopHorizontalScroll />;
  }
};

const DesktopHorizontalScroll = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Create a transform that maps scroll progress to a horizontal translation.
  // The range [0, 1] corresponds to the start and end of the target section's scroll.
  // The second array defines the output range for the horizontal movement.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="events-section">
      <div className="sticky-container">
        <motion.div style={{ x }} className="event-carousel">
          <div className="live-events-panel-desktop">
            <h1 className="live-events-title-desktop">Live Events.</h1>
            <p className="live-events-description-desktop">Scroll to explore our exciting events.</p>
          </div>
          {eventData.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          <div className="event-card-spacer"></div>
        </motion.div>
      </div>
    </section>
  );
};

const MobileCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNav = (direction) => {
    const newSlide = direction === 'next'
      ? (currentSlide + 1) % eventData.length
      : (currentSlide - 1 + eventData.length) % eventData.length;
    setCurrentSlide(newSlide);
  };

  return (
    <main className="events-section">
      <div className="live-events-header-mobile">
        <h1 className="live-events-title-mobile">Live Events</h1>
        <p className="live-events-description-mobile">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
        </p>
      </div>

      <div className="mobile-carousel-container">
        <div className="event-carousel-wrapper">
          <motion.div
            className="event-carousel"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            style={{ display: 'flex', width: `${eventData.length * 100}%` }}
          >
            {eventData.map((event) => (
              <div key={event.id} style={{ width: `${100 / eventData.length}%`, flexShrink: 0 }}>
                <EventCard event={event} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="carousel-nav-mobile">
          <button 
            onClick={() => handleNav('prev')} 
            className="nav-arrow prev-arrow"
            aria-label="Previous event"
          >
            &#8249;
          </button>
          <button 
            onClick={() => handleNav('next')} 
            className="nav-arrow next-arrow"
            aria-label="Next event"
          >
            &#8250;
          </button>
        </div>

        {/* Slide indicators */}
        <div className="slide-indicators">
          {eventData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

const EventCard = ({ event }) => (
  <div className="event-card">
    <div className="event-card-image"><img src={getEventImage(event.id)} alt={event.title} /></div>
    <div className="event-card-content">
      <p className="live-events-title">{event.title}</p>
      <p className="live-events-description">{event.description}</p>
    </div>
    <div className="event-card-buttons">
      <button className="details-button">Details</button>
      {event.tags.map((tag, idx) => (
        <button key={idx} className="tag-button">{tag}</button>
      ))}
    </div>
  </div>
);

export default Events;
