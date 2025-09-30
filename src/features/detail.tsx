import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../services/pokemon/api";
import { PokemonDetail } from "../services/pokemon/type";
import PokemonCard from "../components/card";
import { useLocalStorage } from "../hooks/useLocalStorage";

const typeColor = (type: string) =>
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
    : "bg-gray-500";

const DetailedScreen: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [myPokemons, setMyPokemons] = useLocalStorage<PokemonDetail[]>(
    "myPokemons",
    []
  );

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "fail">(
    "success"
  );

  useEffect(() => {
    if (!name) return;
    let mounted = true;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetail(name);
        if (mounted) setPokemon(data);
      } catch (e) {
        console.error(e);
        if (mounted) setError("Failed to load Pokémon details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();
    return () => {
      mounted = false;
    };
  }, [name]);

  const clearMessage = (ms = 3000) => {
    setTimeout(() => setMessage(null), ms);
  };

  const handleCatch = () => {
    if (!pokemon) return;

    const success = Math.random() < 0.5;

    if (!success) {
      setMessageType("fail");
      setMessage(`${capitalize(pokemon.name)} escaped! Try again.`);
      clearMessage();
      return;
    }

    const defaultNick = capitalize(pokemon.name);
    const nickname = window.prompt(
      `You caught ${defaultNick}! Give it a nickname:`,
      defaultNick
    );

    if (nickname === null) {
      setMessageType("fail");
      setMessage("You cancelled naming — the Pokémon slipped away.");
      clearMessage();
      return;
    }

    const caught: PokemonDetail = {
      id: Date.now(),
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.types,
      nickname: nickname.trim() || defaultNick,
    };

    setMyPokemons([...myPokemons, caught]);
    setMessageType("success");
    setMessage(`Success! You caught ${caught.nickname}!`);
    clearMessage();
  };

  const capitalize = (s: string) => s[0]?.toUpperCase() + s.slice(1);

  if (loading)
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-8 text-red-500">
        {error}. Try refreshing the page.
      </p>
    );
  if (!pokemon)
    return <p className="text-center mt-8 text-gray-600">No Pokémon found</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
        <div
          className="relative flex flex-col items-center pt-8 pb-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(249,250,251,1) 0%, rgba(255,255,255,1) 40%)",
          }}
        >
          <div className="w-40 h-40 flex items-center justify-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <h2 className="mt-2 text-2xl font-bold capitalize">
            {capitalize(pokemon.name)}
          </h2>
          <span className="text-sm text-gray-500">#{String(pokemon.id)}</span>

          <div className="mt-3 flex gap-2" style={{ marginBottom: '10px' }}>
            {pokemon.types.map((t) => (
              <div
                key={t}
                style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                className={`${typeColor(t)} text-white text-xs font-bold px-4 py-1 rounded-2xl capitalize shadow-sm`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500">Weight</div>
              <div className="font-semibold">
                {pokemon.weight !== undefined ? (pokemon.weight / 10).toFixed(1) : "N/A"} kg
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-500">Height</div>
              <div className="font-semibold">
                {pokemon.height !== undefined ? (pokemon.height / 10).toFixed(1) : "N/A"} m
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3" style={{ marginTop: '15px', gap: '5px' }}>
            <button
              onClick={handleCatch}
              type="button"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow cursor-pointer transition"
            >
              Catch
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 px-4 py-2 rounded text-white font-semibold text-center ${
                messageType === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedScreen;
