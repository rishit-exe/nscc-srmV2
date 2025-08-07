import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function AboutUs() {
  const scrollToTeamSection = () => {
    const teamSection = document.querySelector("#our-team-section");
    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div id="about-us">
      <>
        <div className="bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f] min-h-screen relative px-4 py-8 lg:px-8 lg:py-12">
          {/* Unified static background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-[1px] opacity-30" />
              </div>
            ))}
          </div>

          <div className="text-white space-y-8 lg:space-y-12 blend-mode-plus-light relative z-10 max-w-7xl mx-auto">
            {/* Mobile-optimized main content */}
            <div className="text-center lg:text-left mb-8 lg:mb-12">
              <div className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto lg:mx-0 font-helvetica-neue">
                <p className="hover:text-shadow-lg transition-all duration-300 leading-relaxed">
                  The Newton School of Coding Club at SRM started in November
                  2022 and has quickly grown into one of the most active and
                  exciting tech communities on campus. What began as a small
                  idea has now become a strong community of over 250 students
                  who are all passionate about coding and technology.
                </p>
              </div>
            </div>

            {/* Mobile-friendly info card */}
            <div className="mb-12 lg:mb-16">
              <div className="max-w-2xl mx-auto lg:max-w-none lg:w-[500px] lg:float-right lg:ml-8">
                <div
                  className="flex flex-col p-6 lg:p-8 rounded-2xl lg:rounded-3xl space-y-6 lg:space-y-8 border border-white/30 backdrop-blur-sm shadow-xl"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                >
                  <p className="text-justify font-helvetica-neue text-base lg:text-lg leading-relaxed">
                    The Newton School of Coding Club (NSCC) has rapidly grown
                    into a major tech community at SRM. We've reached over
                    20,000 SRM students and connected with 15,000+ students
                    beyond the campus. Our digital presence is strong, with
                    5.5K+ Instagram followers and 1K+ on LinkedIn. With 10+
                    successful events conducted, we've created meaningful
                    learning and networking opportunities. NSCC stands out as a
                    space where students collaborate, build, and innovate
                    together.
                  </p>

                  <div className="h-px bg-white/60"></div>

                  {/* Mobile-centered button */}
                  <div className="flex justify-center">
                    <div
                      style={{
                        backgroundColor: "#D9D9D9",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      className="flex items-center rounded-full w-48 cursor-pointer group transition-all duration-300 hover:w-52 hover:shadow-lg hover:shadow-cyan-500/25"
                      onClick={scrollToTeamSection}
                    >
                      <p className="text-black text-sm sm:text-base ml-4 font-medium group-hover:text-gray-800 transition-colors duration-300">
                        Our Team
                      </p>
                      <button
                        className="ml-2 p-4 transition-all duration-300 rounded-full group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg"
                        style={{ backgroundColor: "#31C4BF" }}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-black text-lg group-hover:text-white transition-colors duration-300"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear-both"></div>
            </div>
          </div>

          {/* Mobile-optimized statistics section */}
          <div
            style={{ color: "#31C4BF" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-4 lg:px-8 relative z-10"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="text-center">
                <CountUp
                  start={0}
                  end={68}
                  duration={2}
                  className="text-4xl sm:text-6xl lg:text-9xl font-bold"
                />
                <span
                  className="text-4xl sm:text-6xl lg:text-8xl font-bold"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl font-medium"
                style={{ color: "#FEFEFE" }}
              >
                Members
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="text-center">
                <CountUp
                  start={0}
                  end={11}
                  duration={2}
                  className="text-4xl sm:text-6xl lg:text-9xl font-bold"
                />
                <span
                  className="text-4xl sm:text-6xl lg:text-8xl font-bold"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl font-medium"
                style={{ color: "#FEFEFE" }}
              >
                Projects
              </p>
            </div>

            <div className="flex flex-col items-center space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="text-center">
                <CountUp
                  start={0}
                  end={21}
                  duration={2}
                  className="text-4xl sm:text-6xl lg:text-9xl font-bold"
                />
                <span
                  className="text-4xl sm:text-6xl lg:text-8xl font-bold"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl font-medium mb-6 lg:mb-10"
                style={{ color: "#FEFEFE" }}
              >
                Sponsors
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
