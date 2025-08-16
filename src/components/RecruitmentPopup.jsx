import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const RecruitmentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closePopup}
      />
      
      {/* Popup content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out animate-popup">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
          aria-label="Close popup"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="p-8 pt-12">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            🚀 Recruitments Open!
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            Join the best tech club at SRMIST. Be a part of breaking barriers between industry standards and academic skills.
          </p>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="https://lu.ma/ur2lwvf9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPopup;