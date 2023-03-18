import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌵</text></svg>" />
                <meta
                    name="description"
                    content="Tim Jefferson | Web Developer, React Enthusiast, Phish Lover."
                    key="desc"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;