import React from "react";

interface PokemonCardProps {
  name: string;
  image: string;
  children?: React.ReactNode;
  nickname?: string;
  flavortext? :String;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  children,
  nickname,
}) => {
  return (
    <div className="flex flex-col items-center border rounded-2xl p-6 bg-gradient-to-br from-white to-sky-50 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-28 h-28 object-contain mb-3 drop-shadow-lg"
      />
      <h3 className="text-xl font-bold capitalize text-center text-sky-900">
        {nickname ? `${nickname} (${name})` : name}
      </h3>
      {children}
    </div>
  );
};

export default PokemonCard;
