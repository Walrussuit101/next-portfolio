'use client';
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { currentPokemonAtom } from "./atoms";
import Pokedex, { Pokemon, EvolutionChain, PokemonSpecies, Chain } from 'pokedex-promise-v2';
import { splitDashResourceName, getTypeColor, chainToDisplay } from "../../../utils/pokedex";
import { EvoChainDisplay } from "../../../types";

const p = new Pokedex();
const blackTextBadgeTypes = ['normal', 'electric']

const PokemonDisplay = ({ bulbasaur, bulbasaurEvoChain }: { bulbasaur: Pokemon, bulbasaurEvoChain?: Chain }) => {
    const [currentPokemon, setCurrentPokemon] = useAtom(currentPokemonAtom);
    const [loadingPokemon, setLoadingPokemon] = useState(false);
    const [loadingChain, setLoadingChain] = useState(false);
    const [data, setData] = useState<Pokemon>(bulbasaur);
    const [evoChain, setEvoChain] = useState<EvoChainDisplay[]>(chainToDisplay(bulbasaurEvoChain));

    const loading = loadingPokemon || loadingChain;

    useEffect(() => {
        const load = async () => {
            setLoadingPokemon(true);
            setLoadingChain(true);

            // get pokemon data
            const res = await p.getPokemonByName(currentPokemon)
            setData(res);

            // get evo chain
            const species = await p.getResource(res.species.url) as PokemonSpecies;

            if (!species.evolution_chain?.url) {
                setEvoChain([]);
            } else {
                const evoChainRes = await p.getResource(species.evolution_chain.url) as EvolutionChain;
                const evoChainDisplay = chainToDisplay(evoChainRes.chain);
                setEvoChain(evoChainDisplay);
            }

            setLoadingChain(false);

            // if we don't have a sprite to load, say we're done loading early
            if (!res.sprites.front_default) setLoadingPokemon(false);
        }

        if (currentPokemon && currentPokemon !== data.name) load();
    }, [currentPokemon]);

    return (
        <div className="flex flex-col bg-transparent w-full md:w-1/2 h-full mb-2 overflow-y-hidden overflow-x-hidden">
            <div className={`flex rounded justify-center items-center h-10 bg-base-300 text-white text-xl ${loading && 'animate-pulse'}`}>
                <span className="inline-block capitalize font-mono">
                    {loading && 'loading ' + splitDashResourceName(currentPokemon) + '...'}
                    {!loading && splitDashResourceName(data.name)}
                </span>
            </div>
            <div className="flex justify-center items-center">
                {
                    data.sprites.front_default &&
                    <img
                        src={data?.sprites.front_default || ''}
                        alt={data?.name + ' sprite'}
                        height={150}
                        width={150}
                        className="m-4"
                        style={{ fontSize: loading ? '0' : 'inherit' }} // hide alt text when trying to load
                        onLoad={() => setLoadingPokemon(false)} // say we're done trying to load when loaded/error
                        onError={() => setLoadingPokemon(false)}
                    />
                }
                {
                    !data.sprites.front_default &&
                    <div className="flex justify-center items-center" style={{ height: '200px', width: '200px' }}>
                        <p className="text-lg">No sprite available</p>
                    </div>
                }
            </div>
            <div className="flex justify-center items-center gap-1">
                {
                    data.types.map(type => <div key={type.type.url} className={`badge badge-lg font-bold capitalize ${loading && 'animate-pulse'} ${blackTextBadgeTypes.includes(type.type.name) ? 'text-base-300' : 'text-white'}`} style={{ backgroundColor: getTypeColor(type.type.name) }}>{type.type.name}</div>)
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-y-4 px-10 pt-4">
                <p className="text-xl">Base Stats:</p>
                {
                    data.stats.map(stat => {
                        return (
                            <div className={`w-full xl:w-2/3 ${loading && 'animate-pulse'}`} key={stat.stat.url}>
                                <label className="block capitalize">{splitDashResourceName(stat.stat.name)}</label>
                                <div className="w-full tooltip tooltip-left" data-tip={stat.base_stat}>
                                    <div className="w-full tooltip tooltip-right" data-tip={255}>
                                        <progress className="progress h-5" value={stat.base_stat} max={255}></progress>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`flex flex-col my-8 gap-4 justify-center items-center ${loading && 'animate-pulse'}`}>
                <p className="text-xl">Evolution Chain:</p>
                <ul className="timeline timeline-vertical">
                    {
                        evoChain.map((chainItem, i) => {
                            return (
                                <li key={`evo-chain-item-${chainItem.name}`}>
                                    <div className="timeline-middle">{chainItem.stage}</div>
                                    <div onClick={() => setCurrentPokemon(chainItem.name)} className={`timeline-box capitalize cursor-pointer ${chainItem.stage % 2 === 0 ? 'timeline-end' : 'timeline-start'} ${data.name === chainItem.name && 'bg-white text-black'}`}>
                                        {splitDashResourceName(chainItem.name)}
                                    </div>
                                    {!!evoChain[i + 1] && <hr />}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default PokemonDisplay;