// src/components/Card.js
import React from "react";

const Card = ({ title, description, imgSrc }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-64">
      <img src={imgSrc} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="text-xl font-semibold mt-2 text-[#6F4F28]">{title}</h3>
      <p className="text-[#A77E55] mt-1">{description}</p>
    </div>
  );
};

export default Card;
