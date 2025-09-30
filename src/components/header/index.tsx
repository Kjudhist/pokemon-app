import React from "react";
import Logo from "../../assets/PokeLogo.png";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-400 to-pink-300 px-8 py-4 flex items-center justify-between shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={Logo}
            alt="Logo"
            className="w-14 h-14 object-contain transition-transform duration-200 group-hover:-translate-y-1"
          />
        </Link>
      </div>

      <div className="hover:bg-cyan-950 hover:text-white rounded-2xl">
        <button className="text-gray-300 transition text-2x2">
          <a
            href="/mypokemon"
            className="text-gray-300 transition"
          >
            My Pokémon
          </a>
        </button>
      </div>
    </header>
  );
};

export default Header;
