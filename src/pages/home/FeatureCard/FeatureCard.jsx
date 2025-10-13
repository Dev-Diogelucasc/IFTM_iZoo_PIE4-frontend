
// Modal dos Componentes da Page Main
const FeatureCard = ({
  icon,
  title,
  description,
  buttonLabel,
  onButtonClick,
}) => (
  <div className="bg-[#F8F8F8] w-full sm:w-115 sm:h-60 border border-stone-300 shadow rounded-2xl p-6 flex flex-col mt-4 gap-4">
    <div className="w-12 h-12 flex items-center justify-center bg-[#E6F2ED] rounded">
      {icon}
    </div>
    <p className="font-semibold text-lg">{title}</p>
    <span className="font-light text-gray-600">{description}</span>
    {buttonLabel && (
      <button
        className=" bg-green-50 rounded border border-stone-300 px-3 py-2 hover:bg-green-600 hover:text-white transition-colors duration-500 ease-in-out cursor-pointer font-medium"
        onClick={onButtonClick}
      >
        {buttonLabel}
      </button>
    )}
  </div>
);

export default FeatureCard;
