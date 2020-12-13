import Head from 'next/head'

const Seo = (props) => {
    return (
        <Head>
            <title>Convex | { props.title }</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Seo