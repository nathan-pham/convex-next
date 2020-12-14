import * as User from "../../../js/database/user"

const handler = async (req, res) => {
    const { username } = req.body

    if(!username) {
        res.json({ error: "please specify a username" })
        return
    }

    const snapshot = await User.query("username", username)
    const display = {}
    
    snapshot.forEach(doc => {
        Object.assign(display, doc.data())
    })
    
    if(snapshot.empty) {
        res.json({ error: "user does not exist" })
        return
    }

    res.json({
        success: display.publicInfo
    })
}

export default handler