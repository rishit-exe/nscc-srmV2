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
    <div id="about-us" style={{ marginTop: "-1px" }}>
      <>
        <div className="bg-gradient-to-b from-[#0a192f] via-[#112240] to-[#061529] min-h-screen relative">
          {/* Unified static background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />
            {/* Static decorative elements */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${15 + (i % 4) * 22}%`,
                  width: `${6 + Math.random() * 18}px`,
                  height: `${6 + Math.random() * 18}px`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-[1px] opacity-30" />
              </div>
            ))}
          </div>

          <div className="text-white p-4 sm:p-5 md:flex md:flex-col md:items-center lg:block space-y-5 blend-mode-plus-light relative z-10">
            {/* Mobile-optimized main content */}
            <div className="text-lg sm:text-xl lg:text-2xl text-center md:text-left max-w-full lg:w-[950px] font-helvetica-neue relative">
              <p className="hover:text-shadow-lg transition-all duration-300 leading-relaxed">
                The Newton School of Coding Club at SRM started in November 2022
                and has quickly grown into one of the most active and exciting
                tech communities on campus. What began as a small idea has now
                become a strong community of over 250 students who are all
                passionate about coding and technology.
              </p>
            </div>

            <div
              className="flex flex-col lg:h-92 w-full max-w-md mx-auto md:w-96 lg:w-[450px] p-6 sm:p-9 rounded-3xl space-y-6 sm:space-y-10 lg:float-right border border-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p className="text-justify font-helvetica-neue text-base sm:text-lg leading-relaxed">
                The Newton School of Coding Club (NSCC) has rapidly grown into a
                major tech community at SRM. We've reached over 20,000 SRM
                students and connected with 15,000+ students beyond the campus.
                Our digital presence is strong, with 5.5K+ Instagram followers
                and 1K+ on LinkedIn. With 10+ successful events conducted, we've
                created meaningful learning and networking opportunities. NSCC
                stands out as a space where students collaborate, build, and
                innovate together.
              </p>

              <div className="h-0.5 bg-white"></div>

              <div className="flex justify-center sm:justify-start">
                <div
                  style={{
                    backgroundColor: "#D9D9D9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="flex items-center rounded-full w-40 sm:w-44 cursor-pointer group transition-all duration-300 hover:w-44 sm:hover:w-48 hover:shadow-lg hover:shadow-cyan-500/25"
                  onClick={scrollToTeamSection}
                >
                  <p className="text-black text-sm sm:text-md ml-4 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    Our Team
                  </p>
                  <button
                    className="ml-2 p-4 sm:p-5 transition-all duration-300 rounded-full group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg"
                    style={{ backgroundColor: "#31C4BF" }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-black text-lg sm:text-2xl group-hover:text-white transition-colors duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="clear-both"></div>
          </div>

          {/* Original statistics layout with mobile responsiveness */}
          <div
            style={{ color: "#31C4BF" }}
            className="sm:flex sm:flex-col md:grid lg:grid grid-cols-3 grid-rows-3 gap-0 space-y-9 md:space-y-0 lg:space-y-0 px-4 sm:px-0"
          >
            <div className="flex flex-col items-center col-start-1 row-start-1">
              <div>
                <CountUp
                  start={0}
                  end={68}
                  duration={2}
                  className="text-4xl sm:text-5xl lg:text-9xl"
                />
                <span
                  className="text-4xl sm:text-5xl lg:text-8xl"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl"
                style={{ color: "#FEFEFE" }}
              >
                Members
              </p>
            </div>
            <div className="flex flex-col items-center col-start-2 row-start-2">
              <div>
                <CountUp
                  start={0}
                  end={11}
                  duration={2}
                  className="text-4xl sm:text-5xl lg:text-9xl"
                />
                <span
                  className="text-4xl sm:text-5xl lg:text-8xl"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl"
                style={{ color: "#FEFEFE" }}
              >
                Projects
              </p>
            </div>
            <div className="flex flex-col items-center col-start-3 row-start-3">
              <div>
                <CountUp
                  start={0}
                  end={21}
                  duration={2}
                  className="text-4xl sm:text-5xl lg:text-9xl"
                />
                <span
                  className="text-4xl sm:text-5xl lg:text-8xl"
                  style={{ color: "#FEFEFE" }}
                >
                  +
                </span>
              </div>
              <p
                className="text-xl sm:text-2xl lg:text-3xl mb-10"
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
