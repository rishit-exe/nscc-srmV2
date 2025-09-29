import React from "react";
import Marquee from "react-fast-marquee";
import { SponsorImage } from "./OptimizedImage";

export default function Sponsors() {
  const sponsorsData = [
    {
      name: "Razorpay",
      image: "/sponser/razorpay.png",
      website: "https://razorpay.com",
    },
    {
      name: "Oracle",
      image: "/sponser/oracale.png",
      website: "https://oracle.com",
    },
    {
      name: "JP Morgan Chase & Co.",
      image: "/sponser/jpmorgan.png",
      website: "https://jpmorganchase.com",
    },
    {
      name: "Newton School",
      image: "/sponser/nslogo1.png",
      website: "https://newtonschool.co",
    },
    {
      name: "Microsoft",
      image: "/sponser/Microsoft-Logo.png",
      website: "https://www.microsoft.com/en-in",
    },
    {
      name: "Sabre",
      image: "/sponser/Sabre_Corporation_logo.png",
      website: "https://www.sabre.com/",
    },
    {
      name: "AOPS",
      image: "/sponser/aops.png",
      website: "https://artofproblemsolving.com/?srsltid=AfmBOoqSyVK8RTyJuHAFHwdE1etOTW5JthcX1yLmXjmlXhukTuO_XibE",
    },
    {
      name: "Belgian Waffles",
      image: "/sponser/belgian.png",
      website: "https://thebelgianwaffle.co/",
    },
    {
      name: "Devfolio",
      image: "/sponser/devfolio.png",
      website: "https://devfolio.co/",
    },
    {
      name: "Dominos",
      image: "/sponser/dominos.png",
      website: "https://www.dominos.co.in/",
    },
    {
      name: "Echo3d",
      image: "/sponser/echo3D.png",
      website: "https://www.echo3d.com/",
    },
    {
      name: "ETH",
      image: "/sponser/ETHIndia.png",
      website: "https://www.linkedin.com/company/ethindia/?originalSubdomain=in",
    },
    {
      name: "Gyandhan",
      image: "/sponser/gyandhan.png",
      website: "https://www.gyandhan.com/?srsltid=AfmBOorycnnUF2-Iq45dF1QGfq-VDIR6L0kSpQ7KNIIPnMPhHpdROwJQ",
    },
    {
      name: "InterviewBuddy",
      image: "/sponser/interview.png",
      website: "https://interviewbuddy.net/?srsltid=AfmBOorA2xLpFhWahKPaXKYGpfUPLCggh1z_Zy8oeq9nr_A0ow80n9hn",
    },
    {
      name: "LeapBeeGee",
      image: "/sponser/leapgeebee.png",
      website: "https://www.geebeeworld.com/",
    },
    {
      name: "OFFO",
      image: "/sponser/offo.png",
      website: "https://offostore.com/?fbclid=PAZXh0bgNhZW0CMTEAAafml2CV1ih1Hd-ubPjIYcv8095wa1YpR-tstPGTqB1NtnDHVJvlox92yin1Og_aem_fPaKk1Ad7d2c8zIb_-6zww",
    },
    {
      name: "Polygon",
      image: "/sponser/polygon.png",
      website: "https://polygon.technology/",
    },
    {
      name: "Purple",
      image: "/sponser/purple.png",
      website: "https://www.purplepalette.in/",
    },
    {
      name: "SRM Dei",
      image: "/sponser/srmdei.png",
      website: "https://www.srmdei.com/",
    },
    {
      name: "StickyMonkey",
      image: "/sponser/Sticky.png",
      website: "https://www.thestickymonkey.com/",
    },
    {
      name: "Sybgen",
      image: "/sponser/sybgen.png",
      website: "https://sybgen.com/",
    },
    {
      name: "Wolfram",
      image: "/sponser/Wolfram.png",
      website: "https://www.wolfram.com/",
    },
    {
      name: "ZSecurity",
      image: "/sponser/zsecurity.png",
      website: "https://zsecurity.org/",
    },
  ];

  return (
    <div
      id="sponsors"
      className="py-16 bg-gradient-to-b from-[#061529] via-[#112240] to-[#0a192f]"
    >
      {/* Section Title */}
      <div className="text-center mb-10">
         <h1 className="text-4xl sm:text-6xl lg:text-[120px] font-normal text-white font-helvetica">
            Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31C4BF] to-[#3b82f6]">
            Sponsors
         </span>
        </h1>
      </div>

      {/* White marquee strip */}
      <div className="bg-white py-6">
        <Marquee speed={60} gradient={false}>
  <div className="flex items-center gap-10 px-4">
    {sponsorsData.map((sponsor, index) => (
      <a
        key={index}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <div className="w-40 h-24 flex items-center justify-center">
          <SponsorImage
            sponsorName={sponsor.image.split('/')[2]} // Extract filename from path
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </a>
    ))}
  </div>
</Marquee>

      </div>
    </div>
  );
}
