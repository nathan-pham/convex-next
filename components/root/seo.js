import Head from 'next/head'

const meta = {
    author: "Ethan Horowitz & Nathan Pham",
    content: "social, media, convex, games, music, forums",
    description: "Connect and share your talents with Convex"
}

const Seo = (props) => {
    const convexTitle = `Convex | ${ props.title || "Error" }`

    return (
        <Head>
            <title>{ convexTitle }</title>
            <link rel="icon" href="/favicon.ico" />

            <meta charSet="utf-8" />

            <meta name="author" content={ meta.author } />
            <meta name="keywords" content={ meta.content } />
            <meta name="description" content={ meta.description } />

            <meta property="og:author" content={ meta.author } />
            <meta property="og:title" content={ convexTitle } />
            <meta property="og:description" content={ meta.description }/>

            <meta property="og:image" content="/icons/apple-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
            <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

            <meta name="theme-color" content="#056674" />
            <link rel="manifest" href="/manifest.json" />

            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="HandheldFriendly" content="true" />
        </Head>
    )
}

export default Seo