import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Events.css";
import eventData from "./events.json";
import oneWebp from "./events-img/one.webp";
import twoPng from "./events-img/two.png";
import threeWebp from "./events-img/three.webp";
import fiveWebp from "./events-img/five.webp";
import four from "./events-img/four.jpg";
import six from "./events-img/six.jpg";

// Map event IDs to imported images
const getEventImage = (eventId) => {
  const imageMap = {
    1: oneWebp,
    2: twoPng,
    3: threeWebp,
    4: four,
    5: fiveWebp,
    6: six,
  };
  return (
    imageMap[eventId] ||
    eventData.find((event) => event.id === eventId)?.imageUrl
  );
};

const Events = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="events-section relative">
      {/* Static unified background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#061529] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Static decorative elements - no animation */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${20 + i * 12}%`,
              top: `${15 + (i % 3) * 30}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-[1px] opacity-30" />
          </div>
        ))}
      </div>

      <div className="sticky-container relative z-10">
        <motion.div style={{ x }} className="event-carousel">
          {/* Simplified Live Events Panel */}
          <div className="live-events-panel-desktop group relative">
            <h1 className="live-events-title-desktop relative z-10">
              Live Events
            </h1>
            <p className="live-events-description-desktop relative z-10">
              Scroll to explore our exciting events.
            </p>
          </div>

          {eventData.map((event, index) => (
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

  // Ensure currentSlide is valid
  useEffect(() => {
    if (currentSlide >= eventData.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, eventData.length]);

  const handleNav = (direction) => {
    const newSlide =
      direction === "next"
        ? (currentSlide + 1) % eventData.length
        : (currentSlide - 1 + eventData.length) % eventData.length;
    setCurrentSlide(newSlide);
  };

  const handleIndicatorClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <main className="events-section relative">
      {/* Static unified background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#061529] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Static decorative elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              width: `${6 + Math.random() * 10}px`,
              height: `${6 + Math.random() * 10}px`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-40" />
          </div>
        ))}
      </div>

      <div className="live-events-header-mobile relative z-10">
        <h1 className="live-events-title-mobile">Live Events</h1>
        <p className="live-events-description-mobile">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation
        </p>
      </div>

      <div className="mobile-carousel-container relative z-10">
        <div className="event-carousel-wrapper relative">
          <motion.div
            className="event-carousel"
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            style={{
              display: "flex",
              width: `${eventData.length * 100}%`,
            }}
          >
            {eventData.map((event, index) => (
              <div
                key={event.id}
                className="carousel-slide"
                style={{
                  width: "100%",
                  flexShrink: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: "100%",
                  maxWidth: "100%",
                }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="carousel-nav-mobile">
          <button
            onClick={() => handleNav("prev")}
            className="nav-arrow prev-arrow"
            aria-label="Previous event"
          >
            &#8249;
          </button>
          <button
            onClick={() => handleNav("next")}
            className="nav-arrow next-arrow"
            aria-label="Next event"
          >
            &#8250;
          </button>
        </div>

        {/* Simplified slide indicators */}
        <div className="slide-indicators">
          {eventData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

const EventCard = ({ event }) => (
  <div className="event-card group relative">
    <div className="event-card-image">
      <img src={getEventImage(event.id)} alt={event.title} />
    </div>
    <div className="event-card-content">
      <p className="live-events-title">{event.title}</p>
      <p className="live-events-description">{event.description}</p>
    </div>
    <div className="event-card-buttons">
      <button className="details-button hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500 transition-all duration-300">
        Details
      </button>
      {event.tags.map((tag, idx) => (
        <button
          key={idx}
          className="tag-button hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 transition-all duration-300"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

export default Events;
