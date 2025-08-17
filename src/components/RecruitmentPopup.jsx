import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const RecruitmentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-[#112240]/90 to-[#061529]/80 backdrop-blur-sm"
        onClick={closePopup}
      />

      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl shadow-2xl border border-cyan-400/20 max-w-md w-full mx-4 transform transition-all duration-300 ease-out animate-popup hover:border-cyan-400/40 hover:shadow-cyan-500/25">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400/40 transition-all duration-200 z-10 group"
          aria-label="Close popup"
        >
          <X size={20} className="text-white group-hover:text-cyan-400 transition-colors duration-200" />
        </button>

        <div className="p-8 pt-12">
          <h2 className="text-2xl font-bold text-white mb-4 text-center font-helvetica-neue">
            🚀 Recruitments Open!
          </h2>

          <p className="text-gray-200 text-center mb-6 leading-relaxed font-helvetica-neue">
            Join the best tech club at SRMIST. Be a part of breaking barriers between industry standards and academic skills.
          </p>

          <div className="text-center">
            <a
              href="https://lu.ma/ur2lwvf9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#31C4BF] hover:bg-cyan-500 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20 hover:border-cyan-400/40"
            >
              Apply Now
            </a>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-500/5 to-transparent blur-2xl opacity-60 -z-10" />
      </div>
    </div>
  );
};

export default RecruitmentPopup;