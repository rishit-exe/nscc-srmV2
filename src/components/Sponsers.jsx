import React from "react";
import FlipCard from "./utils/FlipCard";

export default function Sponsers() {
  const sponsorsData = [
    {
      name: "Razorpay",
      bgColor: "#000000",
      image: "/sponser/razorpay.png",
      description:
        "Leading payment gateway solution empowering businesses with seamless transactions.",
      website: "https://razorpay.com",
    },
    {
      name: "Oracle",
      bgColor: "#000000",
      image: "/sponser/oracale.png",
      description:
        "Global technology leader providing cloud computing and database solutions.",
      website: "https://oracle.com",
    },
    {
      name: "JP Morgan Chase & Co.",
      bgColor: "#000000",
      image: "/sponser/jpmorgan.png",
      description:
        "Leading global financial services firm driving innovation in banking.",
      website: "https://jpmorganchase.com",
    },
    {
      name: "Newton School",
      bgColor: "#000000",
      image: "/sponser/nslogo.png",
      description:
        "Transforming careers through practical, industry-relevant tech education.",
      website: "https://newtonschool.co",
    },
    {
      name: "Microsoft",
      bgColor: "#000000",
      image: "/sponser/Microsoft-Logo.png",
      //description: "Transforming careers through practical, industry-relevant tech education.",
      website: "https://www.microsoft.com/en-in",
    },
    {
      name: "Sabre",
      bgColor: "#000000",
      image: "/sponser/Sabre_Corporation_logo.png",
      //description: "Transforming careers through practical, industry-relevant tech education.",
      website: "https://www.sabre.com/",
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

        <div className="relative z-10 Sponser font-helvetica-neue flex flex-col lg:flex-row lg:justify-between">
          <p className="text-7xl flex justify-center items-center pt-5 lg:py-10 lg:px-5 text-white text-center lg:text-left">
            Journeys Beyond NSCC SRM
          </p>
          <p className="Sponsi-Text text-sm text-center lg:text-left lg:mt-10 px-4 lg:px-5 text-gray-300 lg:w-1/4 max-w-md lg:max-w-none mx-auto lg:mx-0">
            We're proud to be supported by organizations that empower
            innovation, technology, and growth.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex justify-center gap-6 mt-8">
          {sponsorsData.map((sponsor, index) => (
            <FlipCard
              key={index}
              name={sponsor.name}
              bgColor={sponsor.bgColor}
              image={sponsor.image}
              description={sponsor.description}
              website={sponsor.website}
            />
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden px-4 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {sponsorsData.map((sponsor, index) => (
              <FlipCard
                key={index}
                name={sponsor.name}
                bgColor={sponsor.bgColor}
                image={sponsor.image}
                description={sponsor.description}
                website={sponsor.website}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
