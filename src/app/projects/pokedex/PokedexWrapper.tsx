'use client';
import { Chain, NamedAPIResource, Pokemon } from "pokedex-promise-v2";
import PokemonList from "./PokemonList";
import { useHydrateAtoms } from "jotai/utils";
import PokemonDisplay from "./PokemonDisplay";
import { currentPokemonAtom, pokemonAtom } from "./atoms";

const PokedexWrapper = ({ pokemon, bulbasaur, bulbasaurEvoChain }: { pokemon: NamedAPIResource[], bulbasaur: Pokemon, bulbasaurEvoChain?: Chain }) => {
    useHydrateAtoms([
        [pokemonAtom, pokemon],
        [currentPokemonAtom, pokemon[0].name]
    ]);
    
    return (
        <>
            <PokemonDisplay bulbasaur={bulbasaur} bulbasaurEvoChain={bulbasaurEvoChain}/>
            <PokemonList />
        </>
    )
}

export default PokedexWrapper;