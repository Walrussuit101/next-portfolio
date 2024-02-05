import { Metadata } from 'next';
import Pokedex, { EvolutionChain, Pokemon, PokemonSpecies } from 'pokedex-promise-v2';
import PokedexWrapper from './PokedexWrapper';

export const metadata: Metadata = {
    title: 'Tim Jefferson | Pokedex'
};

const PokeDex = async () => {
    const pokemon = await getPokemon();
    const bulbasaur = await getBulbasaur();
    const bulbasaurEvoChain = await getBulbasaurEvoChain(bulbasaur);

    return (
        <div className="flex flex-col md:flex-row justify-start md:justify-center items-start w-full gap-x-2 gap-y-4 p-4">
            <PokedexWrapper pokemon={pokemon} bulbasaur={bulbasaur} bulbasaurEvoChain={bulbasaurEvoChain} />
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

const getBulbasaur = async () => {
    const p = new Pokedex();
    const bulbasaur = await p.getPokemonByName('bulbasaur');
    return bulbasaur;
}

const getBulbasaurEvoChain = async (bulbasaur: Pokemon) => {
    const p = new Pokedex();
    const species = await p.getResource(bulbasaur.species.url) as PokemonSpecies;

    if (!species.evolution_chain?.url) {
        return undefined;
    }

    const evoChain = await p.getResource(species.evolution_chain.url) as EvolutionChain;

    return evoChain.chain;
}