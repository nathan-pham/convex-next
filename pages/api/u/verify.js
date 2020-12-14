import * as Session from "../../../js/database/session"
import cookie from "../../../js/middleware/cookie"

const handler = async (req, res) => {
    await cookie(req, res)
    try {
        const claims = await Session.verify(req.cookie["convex-next"])
        res.json({ success: claims })
    }
    catch(e) { 
        res.json({ error: "failed to authenticate" })
    }
}

export default handler