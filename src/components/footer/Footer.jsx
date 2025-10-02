import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-stone-300 border-t border-b shadow-2xl mb-3 bg-[#F8F8F8] py-4 mt-8">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()}  Izoo. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
