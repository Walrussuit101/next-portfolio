'use client';
import { useAtom, useAtomValue } from "jotai";
import { currentPokemonAtom, pokemonAtom } from "./PokedexWrapper";
import { getPokemonIdFromURL, splitDashResourceName } from "../../utils/pokedex";
import PokemonSearch from "./PokemonSearch";

const PokemonList = () => {
    const pokemon = useAtomValue(pokemonAtom);
    const [currentPokemon, setCurrentPokemon] = useAtom(currentPokemonAtom);

    return (
        <div id="pokemon-list" className='flex flex-col rounded p-0 bg-base-300 w-full md:w-[20rem] h-[16rem] md:h-full gap-1 text-white text-xl overflow-auto'>
            <label className='btn btn-sm mb-1 w-full uppercase sticky top-0 h-10' htmlFor="pokedex-search-modal">search</label>
            {
                pokemon.map((pokemon, i) => {
                    return (
                        <span
                            key={pokemon.url}
                            className={`font-mono px-1 mx-1 capitalize rounded-lg hover:cursor-pointer border-2 border-solid ${currentPokemon === pokemon.name && 'border-red-500 selected-list-pokemon'} ${currentPokemon !== pokemon.name && 'border-transparent hover:border-white'}`}
                            onClick={() => setCurrentPokemon(pokemon.name)}
                        >
                            <span>{getPokemonIdFromURL(pokemon.url)}</span>
                            <span className="capitalize inline-block ml-2">{splitDashResourceName(pokemon.name)}</span>
                        </span>
                    )
                })
            }
            <PokemonSearch />
        </div>
    )
}

export default PokemonList;