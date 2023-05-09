import { Metadata } from 'next';
import Pokedex from 'pokedex-promise-v2';
import PokedexWrapper from '../../../components/pokedex/PokedexWrapper';

export const metadata: Metadata = {
    title: 'Tim Jefferson | Pokedex'
};

const PokeDex = async () => {
    const pokemon = await getPokemon();

    return (
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:h-full w-full gap-x-2 gap-y-4 p-4">
            <PokedexWrapper pokemon={pokemon} />
        </div>
    )
}

export default PokeDex;

const getPokemon = async () => {
    const p = new Pokedex();
    const options = process.env.NODE_ENV === 'development' ? { limit: 10 } : {};
    const res = await p.getPokemonsList(options);

    return res.results;
}