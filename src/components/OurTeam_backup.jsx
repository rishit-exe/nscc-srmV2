import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Element } from 'react-scroll';

import BackgroundImage from "../assets/img/teams/bg.png";
import TextureImage from "../assets/img/teams/texture.png";
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
  const scrollRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  const dataToUse = useMemo(() => propTeamData || teamData, [propTeamData]);
  const sections = Object.keys(dataToUse);

  // Simplified mobile check
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation functions
  const nextSection = () => {
    if (currentSection < sections.length) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };
      return { isMobile: false, isTablet: false };
    const width = window.innerWidth;
    };
  
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
    };

    return (
      <img
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[100px] h-[100px] sm:w-[112px] sm:h-[112px] xl:w-[144px] xl:h-[144px] rounded-full object-cover border-0 shadow-lg z-10"
        src={imageSrc}
        alt={member.name}
        loading="lazy"
        onError={handleImageError}
      />
    );
  };

  // Calculate which sections are fully visible with throttling
  useEffect(() => {
    let timeoutId;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const currentPosition = latest * (totalSections - 1);
        const newVisibleSections = new Set();

        // Check each section (0 is intro, 1+ are team sections)
        for (let i = 0; i < totalSections; i++) {
          const distanceFromCenter = Math.abs(currentPosition - i);
          if (distanceFromCenter <= 0.1) {
            newVisibleSections.add(i);
          }
        }

        setVisibleSections(newVisibleSections);
      }, 16); // ~60fps throttling
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [scrollYProgress, totalSections]);

  // Simplified MemberCard component without heavy animations
  const MemberCard = useCallback(
    ({ member, index = 0 }) => (
      <div 
        className="w-[400px] md:w-[350px] xl:w-[400px] max-w-[90vw] relative flex items-center group hover:scale-105 transition-all duration-500"
      >
        {/* Simplified Card background */}
        <div className="w-full h-[100px] sm:h-[112px] xl:h-[144px] rounded-r-[25px] sm:rounded-r-[50px] ml-[50px] sm:ml-[56px] xl:ml-[72px] overflow-hidden relative bg-gradient-to-br from-gray-800/95 via-slate-800/90 to-gray-900/95 backdrop-blur-xl hover:shadow-2xl hover:shadow-cyan-400/20 transition-all duration-500">
          
          {/* Simple border */}
          <div className="absolute inset-0 border-t border-r border-b border-white/30 group-hover:border-cyan-400/50 transition-all duration-500 rounded-r-[25px] sm:rounded-r-[50px]" />

          {/* Content inside the card */}
          <div className="relative z-10 flex flex-col justify-center h-full pl-[50px] sm:pl-[60px] xl:pl-[90px] pr-3 sm:pr-4 xl:pr-6">
            <h3 className="text-white text-sm sm:text-base xl:text-xl font-normal font-helvetica mb-1 line-clamp-2 sm:line-clamp-1 group-hover:text-cyan-400 transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm xl:text-lg font-extralight font-helvetica mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-1 group-hover:text-gray-200 transition-colors duration-300">
              {member.designation}
            </p>

            <div className="flex gap-1 sm:gap-2 flex-wrap">
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
                      className="w-6 h-6 sm:w-8 sm:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center overflow-hidden relative hover:scale-110 hover:bg-gradient-to-r hover:from-cyan-500/80 hover:to-blue-500/60 transition-all duration-300"
                      title={socialItem.name}
                    >
                      <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-cyan-400/50 transition-colors duration-300" />
                      
                      <img
                        src={iconSrc}
                        alt={socialItem.name}
                        className="relative z-10 w-4 h-4 sm:w-6 sm:h-6 xl:w-8 xl:h-8 object-contain filter brightness-0 invert hover:brightness-1 hover:invert-0 transition-all duration-300"
                      />
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Simplified Circular image */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hover:scale-110 transition-all duration-300">
          <div className="relative hover:shadow-2xl hover:shadow-cyan-400/30 transition-all duration-500 rounded-full">
            <MemberImage member={member} />
            
            {/* Simple ring effect */}
            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full hover:border-cyan-400/60 transition-colors duration-300" />
          </div>
        </div>
      </div>
    ),
    []
  );

  return (
    <section
      id="our-team-section"
      ref={scrollRef}
      className="relative"
      style={{ height: `${totalSections * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Unified static background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f]" />
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
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-50" />
          </div>
        ))}

        <div
          className="flex h-full relative z-10"
          style={{
            transform: `translateX(var(--x, 0))`,
            width: `${totalSections * 100}vw`,
            willChange: "transform",
          }}
        >
          {/* Custom First Page */}
          <div className="w-screen h-screen relative px-4 sm:px-8 flex items-center justify-center">
            <div className="text-center max-w-4xl">
              <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-4xl sm:text-6xl md:text-8xl lg:text-[120px] text-[#FFFFFF] font-normal font-helvetica text-center mix-blend-overlay leading-tight tracking-tight backdrop-blur-[20px] opacity-100 bg-clip-text z-20">
                Our Team{" "}
                <ArrowRight
                  className="inline ml-2 lg:ml-4 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-[120px] lg:h-[120px]"
                  color="#FFFFFF"
                />
              </h1>
              <p className="text-[#AAAAAA] text-sm sm:text-base md:text-lg lg:text-xl font-helvetica font-extralight leading-relaxed max-w-2xl mx-auto">
                We’re a passionate team of creators, coders, and doers committed to building meaningful digital experiences.
                Driven by curiosity and collaboration, we turn ideas into impact — one project at a time.
              </p>
            </div>
          </div>

          {Object.keys(dataToUse).map((sectionKey, sectionIndex) => {
            const section = dataToUse[sectionKey][0];
            const sectionNumber = sectionIndex + 1; // +1 because intro is section 0
            const isFullyVisible = visibleSections.has(sectionNumber);
            const memberCount = section.members.length;
            const requiresScrolling = needsScrolling(memberCount);

            // Memoize grid class calculation
            const gridClasses = useMemo(() => {
              if (memberCount === 1) return "grid-cols-1";
              if (memberCount === 2) return "grid-cols-1 xl:grid-cols-2";
              if (memberCount <= 4) return "grid-cols-1 md:grid-cols-2";
              if (memberCount <= 6)
                return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
              return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
            }, [memberCount]);

            return (
              <div
                key={sectionIndex}
                className="w-dvw h-dvh relative px-4 sm:px-8"
              >
                <h1 className="absolute top-18 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl md:text-6xl lg:text-[120px] text-[#FFFFFF] font-normal font-helvetica text-center mix-blend-overlay leading-tight tracking-tight backdrop-blur-[20px] opacity-100 bg-clip-text z-20 mb-10 mt-5">
                  {section.category}
                </h1>

                <div className="absolute top-24 sm:top-24 md:top-32 lg:top-40 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
                  {requiresScrolling ? (
                    <div
                      className={`h-full transition-all duration-300 ${
                        isFullyVisible
                          ? "overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                          : "overflow-hidden"
                      } pl-2`}
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-6 justify-items-center place-items-center pb-8 pr-4 md:px-8 xl:px-4">
                        {section.members.map((member, memberIndex) => (
                          <MemberCard
                            key={`${member.name}-${memberIndex}`}
                            member={member}
                            index={memberIndex}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div
                        className={`grid gap-6 md:gap-8 xl:gap-6 justify-items-center place-items-center md:px-8 xl:px-4 ${gridClasses}`}
                      >
                        {section.members.map((member, memberIndex) => (
                          <MemberCard
                            key={`${member.name}-${memberIndex}`}
                            member={member}
                            index={memberIndex}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
