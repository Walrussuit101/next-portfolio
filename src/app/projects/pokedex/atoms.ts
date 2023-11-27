import { atom } from "jotai";
import { NamedAPIResource } from "pokedex-promise-v2";

export const pokemonAtom = atom<NamedAPIResource[]>([]);
export const currentPokemonAtom = atom('');