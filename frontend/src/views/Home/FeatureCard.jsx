import React from 'react'
import PropTypes from 'prop-types';

import Card1 from "../../assets/card-1.jpeg"
import Card2 from "../../assets/card-2.jpg"
import Card3 from "../../assets/card-3.png"

export default function FeatureCard() {
  const cards = [
    {
      title: 'Precision Weather Monitoring',
      text: 'Access hyperlocal weather data to make informed decisions about planting, irrigation, and harvesting.',
      detail: 'Monitor real-time conditions, including temperature, humidity, wind speed, and rainfall, tailored to your specific fields.',
      img: Card1
    },
    {
      title: 'Actionable Agricultural Suggestions',
      text: 'Receive proactive recommendations for irrigation adjustments, pest control, and optimized harvesting schedules.',
      detail: 'Leverage data-driven insights to minimize risks, improve resource allocation, and maximize crop yields.',
      img: Card2
    },
    {
      title: 'Real-Time Notifications',
      text: 'Stay informed of critical weather changes and potential threats with instant alerts and notifications.',
      detail: 'Receive timely updates on frost warnings, extreme weather events, and equipment malfunctions, enabling you to respond quickly and protect your crops.',
      img: Card3
    },
  ]

  function Card({ title, text, detail, img }) {
    return (
      <div className="rounded-xl p-6 flex flex-col justify-between w-full md:w-[300px] lg:w-[350px] min-h-[500px] bg-white shadow-md">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="mt-4 text-base leading-7 text-slate-900">{text}</p>
        <div className="mt-6">
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-48 rounded-lg bg-slate-100"
          />
          <p className="text-base leading-7 text-black mt-4">{detail}</p>
        </div>
      </div>
    );
  }

  Card.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  };

  return (
    <section className="py-12 bg-secondary sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl flex flex-col justify-between sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg font-medium text-black">
            Enhance your agricultural practices with our comprehensive weather insights and intelligent suggestions.
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl xl:text-5xl">
            Unlock the Power of Data-Driven Farming
          </h2>
        </div>

        <div className="flex flex-col mt-10 text-center md:mt-20 md:max-w-full sm:max-w-sm sm:mx-auto gap-y-10 md:flex-row md:gap-x-6 lg:gap-x-16 md:text-left">
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}

        </div>
      </div>
    </section>
  );
};

