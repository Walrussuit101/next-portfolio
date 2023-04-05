import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { currentPokemonAtom } from "../../pages/projects/pokedex";
import Pokedex, { Pokemon } from 'pokedex-promise-v2';
import { splitDashResourceName, getTypeColor } from "../../utils/pokedex";

const p = new Pokedex();

const Pokemon = () => {
    const currentPokemon = useAtomValue(currentPokemonAtom);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Pokemon | undefined>(undefined);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const res = await p.getPokemonByName(currentPokemon)
            setData(res);

            // if we don't have a sprite to load, say we're done loading early
            if (!res.sprites.front_default) setLoading(false);
        }

        if (currentPokemon) load();
    }, [currentPokemon]);

    return (
        <div className="flex flex-col bg-transparent w-full md:w-1/2 h-full">
            {
                data &&
                <>
                    <div className="flex rounded justify-center items-center h-10 bg-base-300 text-white text-xl">
                        <span className="inline-block capitalize font-mono">
                            {loading && 'loading ' + splitDashResourceName(currentPokemon) + '...'}
                            {!loading && splitDashResourceName(data?.name)}
                        </span>
                    </div>
                    <div className="flex justify-center items-center">
                        {
                            data?.sprites.front_default &&
                            <img 
                                src={data?.sprites.front_default || ''} 
                                alt={data?.name + ' sprite'} 
                                height={200} 
                                width={200} 
                                className="m-4" 
                                style={{fontSize: loading ? '0' : 'inherit'}} // hide alt text when trying to load
                                onLoad={() => setLoading(false)} // say we're done trying to load when loaded/error
                                onError={() => setLoading(false)} 
                            />
                        }
                        {
                            !data?.sprites.front_default &&
                            <div className="flex justify-center items-center" style={{height: '200px', width: '200px'}}>
                                <p className="text-lg">No sprite available</p>
                            </div>
                        }
                    </div>
                    <div className="flex justify-center items-center gap-1">
                        {
                            data.types.map(type => <div key={type.type.url} className={`badge badge-lg font-bold capitalize ${loading && 'animate-pulse'} ${type.type.name === 'normal' ? 'text-base-300' : 'text-white'}`} style={{ backgroundColor: getTypeColor(type.type.name) }}>{type.type.name}</div>)
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

                </>
            }
        </div>
    )
}

export default Pokemon;