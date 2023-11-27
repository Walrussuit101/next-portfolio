'use client';
import { NamedAPIResource, Pokemon } from "pokedex-promise-v2";
import PokemonList from "./PokemonList";
import { useHydrateAtoms } from "jotai/utils";
import PokemonDisplay from "./PokemonDisplay";
import { currentPokemonAtom, pokemonAtom } from "./atoms";

const PokedexWrapper = ({ pokemon, bulbasaur }: { pokemon: NamedAPIResource[], bulbasaur: Pokemon }) => {
    useHydrateAtoms([
        [pokemonAtom, pokemon],
        [currentPokemonAtom, pokemon[0].name]
    ]);
    
    return (
        <>
            <PokemonDisplay bulbasaur={bulbasaur}/>
            <PokemonList />
        </>
    )
}

export default PokedexWrapper;