import { useState, useRef, useEffect } from 'react';

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Automatic WebP/AVIF support with fallbacks
 * - Responsive images with srcset
 * - Lazy loading with intersection observer
 * - Low-quality placeholder (LQIP)
 * - Error handling with fallback images
 * - Performance monitoring
 */

const OptimizedImage = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px',
  priority = false, // For above-the-fold images
  placeholder = 'blur', // 'blur', 'empty', or custom placeholder
  fallbackSrc = null,
  onLoad = null,
  onError = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(hasError && fallbackSrc ? fallbackSrc : src);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Extract filename without extension for optimized versions
  const getOptimizedSrc = (originalSrc, size, format) => {
    if (!originalSrc) return '';
    
    // Check if it's a team or sponsor image to use optimized versions
    if (originalSrc.includes('/teams/')) {
      const filename = originalSrc.split('/').pop().split('.')[0];
      return `/optimized/teams/${filename}_${size}w.${format}`;
    } else if (originalSrc.includes('/sponser/')) {
      const filename = originalSrc.split('/').pop().split('.')[0];
      return `/optimized/sponsors/${filename}_${size}w.${format}`;
    }
    
    // For other images, return original
    return originalSrc;
  };

  // Generate srcset for responsive images
  const generateSrcSet = (originalSrc, format) => {
    const sizes = [150, 200, 250];
    return sizes
      .map(size => `${getOptimizedSrc(originalSrc, size, format)} ${size}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  // Determine if we should show the image
  const shouldLoadImage = isInView || priority;

  // Generate placeholder styles
  const placeholderStyle = {
    backgroundColor: '#f3f4f6',
    backgroundImage: placeholder === 'blur' 
      ? 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)'
      : 'none',
    backgroundSize: '20px 20px',
    animation: placeholder === 'blur' ? 'shimmer 1.5s ease-in-out infinite' : 'none'
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={placeholderStyle}
        >
          {placeholder === 'blur' && (
            <div className="text-gray-400 text-sm">Loading...</div>
          )}
        </div>
      )}

      {/* Actual Image */}
      {shouldLoadImage && (
        <picture>
          {/* WebP sources with responsive sizing */}
          <source
            srcSet={generateSrcSet(src, 'webp')}
            sizes={sizes}
            type="image/webp"
          />
          
          {/* Fallback format (JPEG/PNG) */}
          <source
            srcSet={generateSrcSet(src, src.includes('.png') ? 'png' : 'jpg')}
            sizes={sizes}
            type={src.includes('.png') ? 'image/png' : 'image/jpeg'}
          />
          
          {/* Final fallback - original image */}
          <img
            src={currentSrc}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -20px 0; }
          100% { background-position: 20px 0; }
        }
      `}</style>
    </div>
  );
};

// Higher-order component for team member images
export const TeamMemberImage = ({ memberName, priority = false, ...props }) => {
  // For Dr. Karthikeyan H, use optimized images but simplified approach
  if (memberName === "Dr. Karthikeyan H") {
    return (
      <picture>
        <source srcSet="/optimized/teams/Dr. Karthikeyan H_150w.webp" type="image/webp" />
        <img
          src="/optimized/teams/Dr. Karthikeyan H_150w.jpg"
          alt="Dr. Karthikeyan H"
          className={props.className}
          style={props.style}
          loading="eager"
          onLoad={() => console.log('✅ Dr. Karthikeyan H loaded (optimized)')}
          onError={(e) => {
            console.log('❌ Dr. Karthikeyan H optimized failed, trying original');
            e.target.src = "/teams/Dr. Karthikeyan H.jpg";
          }}
        />
      </picture>
    );
  }
  
  return (
    <OptimizedImage
      src={`/teams/${memberName}.jpg`}
      alt={memberName}
      fallbackSrc="/NSCC EVECTOR.png"
      sizes="(max-width: 640px) 99px, (max-width: 768px) 111px, 143px"
      priority={priority}
      {...props}
    />
  );
};

// Higher-order component for sponsor images
export const SponsorImage = ({ sponsorName, ...props }) => {
  const filename = sponsorName.split('.')[0]; // Remove extension (e.g., "razorpay.png" → "razorpay")
  
  return (
    <picture>
      <source 
        srcSet={`/optimized/sponsors/${filename}_120w.webp`} 
        type="image/webp" 
      />
      <img
        src={`/optimized/sponsors/${filename}_120w.jpg`}
        alt={`${filename} logo`}
        className={props.className}
        loading="eager"
        onError={(e) => {
          console.log(`❌ Sponsor ${filename} optimized failed, using original`);
          e.target.src = `/sponser/${sponsorName}`;
        }}
        onLoad={() => console.log(`✅ Sponsor ${filename} loaded (optimized)`)}
      />
    </picture>
  );
};

// Performance monitoring hook
export const useImagePerformance = () => {
  useEffect(() => {
    // Monitor Largest Contentful Paint for images
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.element && entry.element.tagName === 'IMG') {
            console.log('Image LCP:', entry.startTime, entry.element.src);
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      return () => observer.disconnect();
    }
  }, []);
};

export default OptimizedImage;