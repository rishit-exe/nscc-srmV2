import { useState, useEffect, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Element } from "react-scroll";

import teamData from "../assets/data/2025-26.js";
import NSCCVector from "../assets/NSCC EVECTOR.png";

import githubIcon from "../assets/img/teams/social-icons/github.png";
import twitterIcon from "../assets/img/teams/social-icons/twitter.png";
import linkedinIcon from "../assets/img/teams/social-icons/linkedin.png";
import instagramIcon from "../assets/img/teams/social-icons/instagram.png";
import globeIcon from "../assets/img/teams/social-icons/globe.png";

const socialIconMap = {
  github: githubIcon,
  twitter: twitterIcon,
  linkedin: linkedinIcon,
  instagram: instagramIcon,
  other_link: globeIcon,
};

const OurTeam = ({ teamData: propTeamData }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const dataToUse = useMemo(() => propTeamData || teamData, [propTeamData]);
  const sections = Object.keys(dataToUse);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Component for handling image with fallback
  const MemberImage = ({ member }) => {
    const [imageSrc, setImageSrc] = useState(`/teams/${member.name}.jpg`);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      if (!imageError) {
        setImageError(true);
        setImageSrc(NSCCVector);
      }
    };

    return (
      <img
        src={imageSrc}
        alt={member.name}
        onError={handleImageError}
        className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] xl:w-[72px] xl:h-[72px] rounded-full object-cover border-2 border-white/30 group-hover:border-cyan-400/60 transition-all duration-300"
      />
    );
  };

  // Simplified MemberCard component
  const MemberCard = ({ member, index = 0 }) => (
    <div className="w-full max-w-[400px] relative flex items-center group hover:scale-105 transition-all duration-500 mb-4">
      {/* Simplified Card background */}
      <div className="w-full h-[80px] sm:h-[100px] rounded-r-[25px] ml-[40px] sm:ml-[50px] overflow-hidden relative bg-gradient-to-br from-gray-800/95 via-slate-800/90 to-gray-900/95 backdrop-blur-xl hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-500">
        {/* Simple border */}
        <div className="absolute inset-0 border-t border-r border-b border-white/30 group-hover:border-cyan-400/50 transition-all duration-500 rounded-r-[25px]" />

        {/* Content inside the card */}
        <div className="relative z-10 flex flex-col justify-center h-full pl-[40px] sm:pl-[60px] pr-3 sm:pr-4">
          <h3 className="text-white text-sm sm:text-base font-normal font-helvetica mb-1 group-hover:text-cyan-400 transition-colors duration-300 truncate">
            {member.name}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm font-extralight font-helvetica mb-2 group-hover:text-gray-200 transition-colors duration-300 truncate">
            {member.designation}
          </p>

          <div className="flex gap-1 sm:gap-2">
            {member.social
              .filter(
                (socialItem) => socialItem.url && socialItem.url.trim() !== ""
              )
              .slice(0, 4)
              .map((socialItem, socialIndex) => {
                const iconSrc = socialIconMap[socialItem.name.toLowerCase()];
                if (!iconSrc) return null;

                return (
                  <a
                    key={socialIndex}
                    href={socialItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center overflow-hidden relative hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-500/60 transition-all duration-300"
                    title={socialItem.name}
                  >
                    <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-cyan-400/50 transition-colors duration-300" />

                    <img
                      src={iconSrc}
                      alt={socialItem.name}
                      className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 object-contain filter brightness-0 invert hover:brightness-1 hover:invert-0 transition-all duration-300"
                    />
                  </a>
                );
              })}
          </div>
        </div>
      </div>

      {/* Simplified Circular image */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition-all duration-300">
        <div className="relative hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-500 rounded-full">
          <MemberImage member={member} />
        </div>
      </div>
    </div>
  );

  // Navigation functions
  const nextSection = () => {
    if (currentSection < sections.length) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <Element name="team" id="our-team-section">
      <section className="min-h-screen bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f] relative">
        {/* Unified background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Static decorative elements */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-25"
            style={{
              left: `${5 + i * 10}%`,
              top: `${15 + (i % 4) * 20}%`,
              width: `${6 + Math.random() * 12}px`,
              height: `${6 + Math.random() * 12}px`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-50" />
          </div>
        ))}

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Title Section */}
          {currentSection === 0 ? (
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="text-center max-w-4xl">
                <h1 className="text-4xl sm:text-6xl md:text-8xl text-white font-normal font-helvetica mb-8">
                  Our Team
                </h1>
                <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
                  Meet the passionate individuals driving innovation and
                  creativity at NSCC SRM
                </p>
                <button
                  onClick={nextSection}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                >
                  Explore Team <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 px-4 sm:px-8 py-12">
              {/* Section Navigation */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                <button
                  onClick={() => setCurrentSection(0)}
                  className="px-4 py-2 rounded-full bg-gray-700/50 text-white hover:bg-cyan-500/30 transition-all duration-300"
                >
                  Home
                </button>
                {sections.map((section, index) => (
                  <button
                    key={section}
                    onClick={() => setCurrentSection(index + 1)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      currentSection === index + 1
                        ? "bg-cyan-500/50 text-white"
                        : "bg-gray-700/50 text-white hover:bg-cyan-500/30"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              {/* Team Members Grid */}
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-5xl text-white font-normal font-helvetica text-center mb-12">
                  {sections[currentSection - 1]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {dataToUse[sections[currentSection - 1]]?.map(
                    (member, index) => (
                      <MemberCard
                        key={member.name}
                        member={member}
                        index={index}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation arrows */}
          {currentSection > 0 && (
            <div className="flex justify-between items-center px-8 pb-8">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className="p-3 rounded-full bg-gray-700/50 text-white hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>

              <span className="text-gray-300">
                {currentSection === 0
                  ? "Welcome"
                  : `${currentSection} of ${sections.length}`}
              </span>

              <button
                onClick={nextSection}
                disabled={currentSection === sections.length}
                className="p-3 rounded-full bg-gray-700/50 text-white hover:bg-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </Element>
  );
};

export default OurTeam;
