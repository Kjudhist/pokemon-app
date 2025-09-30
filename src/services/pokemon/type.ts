export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  nickname?: string;
  weight?: number;
  height?: number;
}

export interface PokemonListResponse {
  pokemons: PokemonDetail[];
  total: number;
}
