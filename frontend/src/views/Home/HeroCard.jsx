import React from 'react'
import myImage from '../../assets/background.jpeg';

export default function HeroCard() {
  return (
      <div className="w-full">
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-600 py-24 md:py-32">

          <div className="absolute inset-0 opacity-30">
            <img
              src={myImage}
              alt="background image"
              className="object-cover w-full h-full aspect-[16/9]"
              style={{ backgroundColor: "transparent" }}
            />
            <div className="absolute inset-0 bg-main opacity-90 mix-blend-multiply" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-main to-secondary text-xl font-semibold">
                Empowering Farmers with Smart Technology
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                SmartSprout Solutions: Your Agricultural Command Center
              </h1>
              <p className="mt-5 text-base text-secondary">
                Gain actionable weather insights, customize your fields, and receive
                real-time notifications to optimize your farming practices and maximize yields.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

