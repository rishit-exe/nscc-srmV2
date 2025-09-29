import React from "react";
import FlipCard from "./utils/FlipCard";

export default function Journey() {
    const sponsorsData = [
    {
      name: "Razorpay",
      bgColor: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)",
      image: "/sponser/razorpay.png",
      description:
        "Leading payment gateway solution empowering businesses with seamless transactions.",
      website: "https://razorpay.com",
      accent: "#31C4BF",
    },
    {
      name: "Oracle",
      bgColor: "linear-gradient(135deg, #164e63 0%, #0891b2 50%, #06b6d4 100%)",
      image: "/sponser/oracale.png",
      description:
        "Global technology leader providing cloud computing and database solutions.",
      website: "https://oracle.com",
      accent: "#67e8f9",
    },
    {
      name: "JP Morgan Chase & Co.",
      bgColor: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
      image: "/sponser/jpmorgan.png",
      description:
        "Leading global financial services firm driving innovation in banking.",
      website: "https://jpmorganchase.com",
      accent: "#22d3ee",
    },
    {
      name: "Newton School",
      bgColor: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
      image: "/sponser/nslogo.png",
      description:
        "Transforming careers through practical, industry-relevant tech education.",
      website: "https://newtonschool.co",
      accent: "#60a5fa",
    },
    {
      name: "Microsoft",
      bgColor: "linear-gradient(135deg, #155e75 0%, #0891b2 50%, #22d3ee 100%)",
      image: "/sponser/Microsoft-Logo.png",
      description:
        "Empowering every person and organization on the planet to achieve more.",
      website: "https://www.microsoft.com/en-in",
      accent: "#67e8f9",
    },
    {
      name: "Sabre",
      bgColor: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)",
      image: "/sponser/Sabre_Corporation_logo.png",
      description: "Technology solutions that take travel to the next level.",
      website: "https://www.sabre.com/",
      accent: "#31C4BF",
    },
  ];

  return (
    <div id="sponsors">
      <div className="bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f] min-h-screen relative">
        {/* Unified background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-blue-500/5" />

        {/* Static decorative elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-25"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg opacity-50" />
          </div>
        ))}

        <div className="relative z-10 font-helvetica-neue px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-center lg:text-left leading-tight">
                  Journeys Beyond
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#31C4BF] to-[#3b82f6] mt-2">
                    NSCC SRM
                  </span>
                </h1>
              </div>
              <div className="lg:w-1/3 lg:max-w-md">
                <p className="text-base sm:text-lg text-gray-300 text-center lg:text-left leading-relaxed">
                  We're proud to be supported by organizations that empower
                  <span className="text-[#31C4BF] font-medium">
                    {" "}
                    innovation
                  </span>
                  ,
                  <span className="text-[#3b82f6] font-medium">
                    {" "}
                    technology
                  </span>
                  , and
                  <span className="text-[#22d3ee] font-medium"> growth</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modern responsive layout */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Desktop View */}
            <div className="hidden lg:flex justify-center items-center gap-8 flex-wrap">
              {sponsorsData.map((sponsor, index) => (
                <FlipCard
                  key={index}
                  name={sponsor.name}
                  bgColor={sponsor.bgColor}
                  image={sponsor.image}
                  description={sponsor.description}
                  website={sponsor.website}
                  accent={sponsor.accent}
                />
              ))}
            </div>

            {/* Tablet & Mobile View */}
            <div className="lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {sponsorsData.map((sponsor, index) => (
                  <FlipCard
                    key={index}
                    name={sponsor.name}
                    bgColor={sponsor.bgColor}
                    image={sponsor.image}
                    description={sponsor.description}
                    website={sponsor.website}
                    accent={sponsor.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
