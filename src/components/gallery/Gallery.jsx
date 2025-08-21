import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gallery.css";

// Import the actual images from the content folder
import image1 from "./content/image_6160x4640_1.jpeg";
import image2 from "./content/image_6160x4640_2.jpeg";
import image3 from "./content/image_6160x4640_3.jpeg";
import image4 from "./content/image_6160x4640_4.jpeg";
import image5 from "./content/image_6160x4640_5.jpeg";
import hacknova1 from "./content/hacknova (1).jpg";
import hacknova2 from "./content/hacknova (2).jpg";
import hacknova3 from "./content/hacknova (3).jpg";

gsap.registerPlugin(ScrollTrigger);

// Updated image data with the actual images from content folder
const galleryImages = [
  { id: 1, src: hacknova2, w: 794, h: 619, y: "-12%" },
  { id: 2, src: image5, w: 6160, h: 4640, y: "10%" },
  { id: 3, src: image1, w: 6160, h: 4640, y: "5%" },
  { id: 4, src: hacknova1, w: 892, h: 619, y: "8%" },
  { id: 5, src: image2, w: 6160, h: 4640, y: "-10%" },
  { id: 6, src: hacknova3, w: 619, h: 619, y: "18%" },
  { id: 7, src: image3, w: 6160, h: 4640, y: "15%" },
  { id: 8, src: image4, w: 6160, h: 4640, y: "-5%" },
];

export default function Gallery() {
  const component = useRef(null);
  const carousel = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Updated to include tablets (768px - 1024px)
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip GSAP animations on mobile

    let ctx = gsap.context(() => {
      const carouselElement = carousel.current;
      if (!carouselElement) return;

      // Start the carousel off-screen
      gsap.set(carouselElement, { x: "100vw" });

      const computedStyle = window.getComputedStyle(carouselElement);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      // Calculate the total scrollable width more accurately
      const totalScroll =
        carouselElement.scrollWidth - window.innerWidth + paddingRight;

      // Ensure we scroll through all images by adding extra distance
      const extraScroll = Math.max(0, totalScroll * 0.3); // Add 30% extra to ensure last image is fully visible

      // Ensure minimum scroll distance to show all images
      const minScrollDistance = Math.max(
        totalScroll + extraScroll,
        window.innerWidth * 0.5
      );

      // Debug logging to check carousel dimensions
      console.log("Carousel scrollWidth:", carouselElement.scrollWidth);
      console.log("Window width:", window.innerWidth);
      console.log("Total scroll:", totalScroll);
      console.log("Extra scroll:", extraScroll);
      console.log("Number of images:", galleryImages.length);

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          pin: true,
          scrub: 1,
          end: () => `+=${minScrollDistance}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate the carousel into view from the right, then scroll it to the left
      tl.to(carouselElement, { x: "0vw", duration: 0.2 }).to(carouselElement, {
        x: `-${minScrollDistance}px`,
        duration: 0.8,
      });
    }, component);
    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="gallery-container mobile">
        <div className="gallery-mobile-content">
          <h1 className="gallery-title mobile">Gallery</h1>
          <div className="gallery-mobile-grid">
            {galleryImages.map((image) => (
              <div key={image.id} className="gallery-mobile-image-wrapper">
                <img
                  src={image.src}
                  alt={`Gallery image ${image.id}`}
                  className="gallery-mobile-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="gallery" className="gallery-container" ref={component}>
      {/* Unified static background */}
      <div className="gallery-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f] opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Static decorative elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${6 + Math.random() * 12}px`,
              height: `${6 + Math.random() * 12}px`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-50 transform rotate-45" />
          </div>
        ))}

        {/* Simplified title */}
        <div className="relative inline-block z-10">
          <h1 className="gallery-title relative z-10 hover:text-shadow-lg hover:text-cyan-400 transition-all duration-500">
            Gallery
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl opacity-60 -z-10"></div>
        </div>
      </div>

      {/* Enhanced carousel with advanced animations */}
      <div className="gallery-carousel" ref={carousel}>
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="gallery-image-wrapper group hover:scale-105 hover:z-10 transition-all duration-500"
            style={{
              "--w": `${image.w}px`,
              "--h": `${image.h}px`,
              transform: `translateY(${image.y})`,
            }}
          >
            <img
              src={image.src}
              alt={`Gallery image ${image.id}`}
              className="gallery-image hover:brightness-110 hover:contrast-110 hover:saturate-120 transition-all duration-500"
            />

            {/* Simplified overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl backdrop-blur-[1px] group-hover:bg-gradient-to-t group-hover:from-cyan-500/30 group-hover:via-transparent group-hover:to-blue-500/20" />

            {/* Simple border */}
            <div className="absolute inset-0 border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 group-hover:border-cyan-400/60 transition-all duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
