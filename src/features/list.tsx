  import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemonList } from "../services/pokemon/api";
import { PokemonDetail } from "../services/pokemon/type";
import PokemonCard from "../components/card";

const ListScreen: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonList(limit, (currentPage - 1) * limit);
        setPokemons(data.pokemons);
        setTotalPages(Math.ceil(data.total / limit));
      } catch {
        setError("Failed to fetch Pokémon list");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl w-full">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="cursor-pointer"
            onClick={() => navigate(`/detail/${pokemon.name}`)}
          >
            <PokemonCard name={pokemon.name} image={pokemon.image}>
              <div className="mt-2 flex justify-center gap-2">
                {pokemon.types.map((type) => (
                  <div
                    key={type}
                    style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
                    className={`py-3 rounded-lg border border-white text-white text-xs font-bold capitalize shadow-sm inline-block mr-1 ${
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
            </PokemonCard>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4" style={{ marginTop: '25px' }}>
        <style>
          {`
            button {
              margin-top: 10px;
            }
          `}
        </style>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListScreen;
