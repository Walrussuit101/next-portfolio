
import Head from "next/head";

interface props {
    title: string
}
const PageTitle = ({ title }: props) => {
    return (
        <Head>
            <title>{`Tim Jefferson | ${ title }`}</title>
        </Head>
    )
}

export default PageTitle;