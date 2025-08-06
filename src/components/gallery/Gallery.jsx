import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

// Updated image data with varying dimensions and vertical offsets
const galleryImages = [
  { id: 1, src: 'https://placehold.co/600x800/1c2a4a/ffffff?text=Image+1', w: 600, h: 800, y: '5%' },
  { id: 2, src: 'https://placehold.co/800x600/3a506b/ffffff?text=Image+2', w: 800, h: 600, y: '-10%' },
  { id: 3, src: 'https://placehold.co/600x600/5c9ead/ffffff?text=Image+3', w: 600, h: 600, y: '15%' },
  { id: 4, src: 'https://placehold.co/800x1000/82c0cc/ffffff?text=Image+4', w: 800, h: 1000, y: '-5%' },
  { id: 5, src: 'https://placehold.co/1200x800/a8d5e2/000000?text=Image+5', w: 1200, h: 800, y: '10%' },
  { id: 6, src: 'https://placehold.co/700x900/d4eaf7/000000?text=Image+6', w: 700, h: 900, y: '-15%' },
  { id: 7, src: 'https://placehold.co/900x900/f7f7f7/000000?text=Image+7', w: 900, h: 900, y: '0%' },
  { id: 8, src: 'https://placehold.co/1000x800/1c2a4a/ffffff?text=Image+8', w: 1000, h: 800, y: '5%' },
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
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    if (isMobile) return; // Skip GSAP animations on mobile

    let ctx = gsap.context(() => {
      const carouselElement = carousel.current;
      if (!carouselElement) return;

      // Start the carousel off-screen
      gsap.set(carouselElement, { x: '100vw' });

      const computedStyle = window.getComputedStyle(carouselElement);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      // Calculate the total scrollable width more accurately
      const totalScroll = carouselElement.scrollWidth - window.innerWidth + paddingRight;
      
      // Ensure we scroll through all images by adding extra distance
      const extraScroll = Math.max(0, totalScroll * 0.3); // Add 30% extra to ensure last image is fully visible
      
      // Ensure minimum scroll distance to show all images
      const minScrollDistance = Math.max(totalScroll + extraScroll, window.innerWidth * 0.5);
      
      // Debug logging to check carousel dimensions
      console.log('Carousel scrollWidth:', carouselElement.scrollWidth);
      console.log('Window width:', window.innerWidth);
      console.log('Total scroll:', totalScroll);
      console.log('Extra scroll:', extraScroll);
      console.log('Number of images:', galleryImages.length);

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
      tl.to(carouselElement, { x: '0vw', duration: 0.2 })
        .to(carouselElement, { x: `-${minScrollDistance}px`, duration: 0.8 });

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
                <img src={image.src} alt={`Gallery image ${image.id}`} className="gallery-mobile-image" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="gallery" className="gallery-container" ref={component}>
      <div className="gallery-background">
        <h1 className="gallery-title">Gallery.</h1>
      </div>
      <div className="gallery-carousel" ref={carousel}>
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="gallery-image-wrapper"
            style={{
              '--w': `${image.w}px`,
              '--h': `${image.h}px`,
              transform: `translateY(${image.y})`,
            }}
          >
            <img src={image.src} alt={`Gallery image ${image.id}`} className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
}
