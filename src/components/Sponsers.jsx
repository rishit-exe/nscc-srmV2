import React from 'react';
import FlipCard from './utils/FlipCard'; 

export default function Sponsers() {
    const sponsorsData = [
        {
            name: "Razorpay",
            bgColor: "#000000",
            image: "/sponser/razorpay.png",
            description: "Leading payment gateway solution empowering businesses with seamless transactions.",
            website: "https://razorpay.com"
        },
        {
            name: "Oracle",
            bgColor: "#000000",
            image: "/sponser/oracale.png",
            description: "Global technology leader providing cloud computing and database solutions.",
            website: "https://oracle.com"
        },
        {
            name: "JP Morgan Chase & Co.",
            bgColor: "#000000",
            image: "/sponser/jpmorgan.png",
            description: "Leading global financial services firm driving innovation in banking.",
            website: "https://jpmorganchase.com"
        },
        {
            name: "Newton School",
            bgColor: "#000000",
            image: "/sponser/nslogo.png",
            description: "Transforming careers through practical, industry-relevant tech education.",
            website: "https://newtonschool.co"
        }
    ];

    return (
        <div className="sponsi-container bg-black">
            <div className="Sponser font-helvetica-neue flex flex-col lg:flex-row lg:justify-between">
                <p className="Sponser-Title flex justify-center items-center pt-5 lg:py-10 lg:px-5 text-white">
                    Our Sponsors.
                </p>
                <p className="Sponsi-Text text-sm text-left lg:mt-10 px-9 lg:px-5 text-gray-300 lg:w-1/4">
                    We're proud to be supported by organizations that empower innovation, technology, and growth.
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
            <div className="lg:hidden px-6 mt-8">
                <div className="grid grid-cols-2 gap-4">
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
    );
}