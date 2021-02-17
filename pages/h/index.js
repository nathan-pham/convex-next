// import { useState } from "react"
// import { useRouter } from "next/router"

import Root from "../../components/root/root"
import * as Session from "../../js/database/session"

const Home = (props) => {
    // const router = useRouter()
    // const [ user, setUser ] = useState({ })

    // query("u/claims").then(details => {
    //     if(details.hasOwnProperty("error") && process.browser) {
    //         router.push("/")
    //         return
    //     }

    //     setUser(details)
    // })

    return (
        <Root title="Home">
            <h1>Hello World</h1>
            { JSON.stringify(props) }
        </Root>
    )
}

export const getServerSideProps = async ({ req }) => {
    const props = await Session.verify(req.cookies["convex-next"])

    return {
        props
    }
}

export default Home