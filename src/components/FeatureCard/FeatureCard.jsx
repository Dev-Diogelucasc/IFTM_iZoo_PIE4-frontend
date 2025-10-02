import React from "react";

const FeatureCard = ({
  icon,
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => (
  <div className="bg-[#F8F8F8] w-full sm:w-80 border border-stone-300 shadow rounded-2xl p-6 flex flex-col gap-4">
    <div className="w-12 h-12 flex items-center justify-center bg-[#E6F2ED] rounded">
      {icon}
    </div>
    <p className="font-semibold text-lg">{title}</p>
    <span className="font-light text-gray-600">{description}</span>
    {buttonLabel && (
      <button
        className="rounded border border-stone-300 px-3 py-2 hover:bg-green-700 hover:text-white transition-colors duration-500 ease-in-out cursor-pointer font-medium"
        onClick={onButtonClick}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

export default FeatureCard;
