'use client';
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { currentPokemonAtom, pokemonAtom } from "./atoms";
import { splitDashResourceName } from "../../../utils/pokedex";

const PokemonSearch = () => {
    const pokemon = useAtomValue(pokemonAtom);
    const setCurrentPokemon = useSetAtom(currentPokemonAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<typeof pokemon>([]);

    useEffect(() => {
        if (query) {
            const timeout = setTimeout(async () => {
                const res = pokemon.filter(pokemon => pokemon.name.startsWith(query.toLowerCase()));
                setResults(res);
            }, 400);

            return () => clearTimeout(timeout);
        } else {
            setResults([]);
        }
    }, [query]);

    const selectPokemon = (name: string) => {
        setCurrentPokemon(name);
        setQuery('');
        if (inputRef.current) {
            inputRef.current.checked = false;
        }

        setTimeout(() => {
            const list = document.querySelector('#pokemon-list');
            const selected = document.querySelector('.selected-list-pokemon');

            // offsetTop isn't defined in TS?
            //@ts-ignore
            list?.scrollTo({ top: selected.offsetTop - list.offsetTop - (list.clientHeight / 4), behavior: 'smooth' });
        }, 250);
    }

    return (
        <>
            <input ref={inputRef} type="checkbox" id="pokedex-search-modal" className="modal-toggle" />
            <label htmlFor="pokedex-search-modal" className="modal cursor-pointer">
                <label className="modal-box relative h-[30rem] overflow-hidden" htmlFor="">
                    <div className="flex justify-center items-center gap-x-4">
                        <input
                            type="text"
                            placeholder="Search Pokemon"
                            className="input w-full input-bordered"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <label htmlFor="pokedex-search-modal" className="btn btn-square uppercase">x</label>
                    </div>
                    <ul className="menu flex-nowrap mt-4 h-[20rem] w-full rounded-b overflow-y-auto">
                        {
                            results.map((pokemon, i) => {
                                return (
                                    <div key={`search-${pokemon.url}`}>
                                        <li className="hover:underline text-base" onClick={() => selectPokemon(pokemon.name)}>
                                            <span className="capitalize">{splitDashResourceName(pokemon.name)}</span>
                                        </li>
                                        {i + 1 < results.length && <div className="divider"></div>}
                                    </div>
                                )
                            })
                        }
                    </ul>
                </label>
            </label>
        </>
    )
}

export default PokemonSearch;