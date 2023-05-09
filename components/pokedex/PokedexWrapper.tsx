'use client';
import { atom } from "jotai";
import { NamedAPIResource } from "pokedex-promise-v2";
import Pokemon from "./Pokemon";
import PokemonList from "./PokemonList";
import { useHydrateAtoms } from "jotai/utils";

export const pokemonAtom = atom<NamedAPIResource[]>([]);
export const currentPokemonAtom = atom('');

const PokedexWrapper = ({ pokemon }: { pokemon: NamedAPIResource[] }) => {
    useHydrateAtoms([
        [pokemonAtom, pokemon] as const,
        [currentPokemonAtom, pokemon[0].name] as const
    ]);
    
    return (
        <>
            <Pokemon />
            <PokemonList />
        </>
    )
}

export default PokedexWrapper;