import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
import NavDrawer from "../components/NavDrawer";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    if (router.pathname === '/_error') return <Component {...pageProps} />

    return (
        <NavDrawer>
            <NavBar />
            <Component {...pageProps} />
        </NavDrawer>
    )
}

export default App;