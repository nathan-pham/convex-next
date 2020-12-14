import * as Session from "../../../js/database/session"

const handler = async (req, res) => {
    const { idToken} = req.body

    if(!idToken) {
        res.json({ error: "please specify an id token" })
        return
    }
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000

    try {
        const cookie = await Session.create(idToken, expiresIn)
        res.json({ success: cookie })
    }
    catch(e) {
        res.json({ error: "failed to establish session" })
    }
}

export default handler