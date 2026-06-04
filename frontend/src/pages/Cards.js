// src/components/Card.js
import React from "react";

const Card = ({ title, description, imgSrc }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl overflow-hidden shadow-lg h-full">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-44 object-cover"
      />
      <div className="p-5 text-center flex flex-col justify-between h-full">
        <h2 className="text-xl font-semibold mb-2 text-[#6F4F28]">{title}</h2>
        <p className="text-sm text-[#6F4F28]">{description}</p>
      </div>
    </div>
  );
};

export default Card;
