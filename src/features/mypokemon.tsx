import React from "react";
import PokemonCard from "../components/card";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PokemonDetail } from "../services/pokemon/type";

const MyPokemon: React.FC = () => {
  const [myPokemons, setMyPokemons] = useLocalStorage<PokemonDetail[]>(
    "myPokemons",
    []
  );

  if (myPokemons.length === 0)
    return <p className="text-center mt-8">You have no Pokémon yet!</p>;

  const handleRelease = (pokemon: PokemonDetail) => {
    if (
      !window.confirm(
        `Are you sure you want to release ${pokemon.nickname || pokemon.name}?`
      )
    )
      return;

    const filtered = myPokemons.filter((p) => p.id !== pokemon.id);
    setMyPokemons(filtered);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {myPokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          nickname={pokemon.nickname || pokemon.name}
        >
          <div className="mt-2 flex justify-center gap-2">
                {pokemon.types.map((type) => (
                  <div
                    key={type}
                    style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                    className={`py-3 rounded-lg border border-white text-white text-lg font-extrabold capitalize shadow-sm inline-block mr-4 ${
                      type === "fire"
                        ? "bg-red-500"
                        : type === "water"
                        ? "bg-blue-500"
                        : type === "grass"
                        ? "bg-green-500"
                        : type === "electric"
                        ? "bg-yellow-400"
                        : type === "psychic"
                        ? "bg-purple-500"
                        : type === "ice"
                        ? "bg-cyan-400"
                        : type === "dragon"
                        ? "bg-indigo-600"
                        : type === "dark"
                        ? "bg-gray-800"
                        : type === "fairy"
                        ? "bg-pink-400"
                        : type === "poison"
                        ? "bg-purple-600"
                        : type === "ground"
                        ? "bg-yellow-600"
                        : type === "flying"
                        ? "bg-sky-400"
                        : type === "bug"
                        ? "bg-lime-500"
                        : type === "rock"
                        ? "bg-yellow-800"
                        : type === "ghost"
                        ? "bg-indigo-800"
                        : type === "steel"
                        ? "bg-gray-400"
                        : type === "fighting"
                        ? "bg-red-700"
                        : "bg-gray-500"
                    }`}
                  >
                    {type}
                  </div>
                ))}
          </div>

          <button
            type="button"
            onClick={() => handleRelease(pokemon)}
            className="mt-4 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow cursor-pointer transition"
            style={{ marginTop: '10px' }}
          >
            Release
          </button>
        </PokemonCard>
      ))}
    </div>
  );
};

export default MyPokemon;
