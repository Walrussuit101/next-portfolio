'use client';
import { atom } from "jotai";
import { NamedAPIResource, Pokemon } from "pokedex-promise-v2";
import PokemonList from "./PokemonList";
import { useHydrateAtoms } from "jotai/utils";
import PokemonDisplay from "./PokemonDisplay";

export const pokemonAtom = atom<NamedAPIResource[]>([]);
export const currentPokemonAtom = atom('');

const PokedexWrapper = ({ pokemon, bulbasaur }: { pokemon: NamedAPIResource[], bulbasaur: Pokemon }) => {
    useHydrateAtoms([
        [pokemonAtom, pokemon] as const,
        [currentPokemonAtom, pokemon[0].name] as const
    ]);
    
    return (
        <>
            <PokemonDisplay bulbasaur={bulbasaur}/>
            <PokemonList />
        </>
    )
}

export default PokedexWrapper;