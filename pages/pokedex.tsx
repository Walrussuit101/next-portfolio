import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NamedAPIResource } from 'pokedex-promise-v2';
import { atom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import NavDrawer from '../components/NavDrawer';
import PageTitle from '../components/PageTitle';
import PokemonList from '../components/pokedex/PokemonList';
import ProjectsDrawer from '../components/ProjectsDrawer';
import Pokemon from '../components/pokedex/Pokemon';
import Pokedex from 'pokedex-promise-v2';

export const pokemonAtom = atom<NamedAPIResource[]>([]);
export const currentPokemonAtom = atom('');

const PokeDex = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    useHydrateAtoms([
        [pokemonAtom, props.pokemon] as const,
        [currentPokemonAtom, props.pokemon[0].name] as const
    ]);

    return (
        <ProjectsDrawer>
            <NavDrawer>
                <PageTitle title="Pokedex" />
                <NavBar />
                <div className="flex flex-col md:flex-row justify-start md:justify-center items-start md:h-full w-full gap-x-2 gap-y-4 p-4">
                    <Pokemon />
                    <PokemonList />
                </div>
                <Footer />
            </NavDrawer>
        </ProjectsDrawer>
    )
}

export default PokeDex;

interface PageProps {
    pokemon: NamedAPIResource[]
}
export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const p = new Pokedex();
    const options = process.env.NODE_ENV === 'development' ? { limit: 10 } : {};
    const res = await p.getPokemonsList(options);

    return {
        props: {
            pokemon: res.results
        }
    }
}