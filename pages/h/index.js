import { useState } from "react"

import Root from "../../components/root/root"
import query from "../../js/query"

const Home = (props) => {
    const [ user, setUser ] = useState({ })
    query("u/verify").then(setUser)

    return (
        <Root title="Home">
            <h1>Hello World</h1>
            { JSON.stringify(user) }
        </Root>
    )
}

export default Home