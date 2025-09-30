import API from "../api";
import { PokemonDetail, PokemonListResponse } from "./type";

export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const res = await API.get(`/pokemon?limit=${limit}&offset=${offset}`);
  const results = res.data.results;
  const total = res.data.count;

  const detailed = await Promise.all(
    results.map(async (p: { name: string; url: string }) => {
      const detailRes = await API.get(p.url);
      const data = detailRes.data;
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default || "",
        types: data.types.map((t: any) => t.type.name),
      };
    })
  );

  return { pokemons: detailed, total };
};

export const getPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await API.get(`/pokemon/${name}`);
  const data = res.data;
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default || "",
    types: data.types.map((t: any) => t.type.name),
    weight: data.weight,
    height: data.height,
  };
};
