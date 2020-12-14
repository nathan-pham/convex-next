import * as Session from "../../../js/database/session"
import cookie from "../../../js/middleware/cookie"

const handler = async (req, res) => {
    await cookie(req, res)

    try {
        await Session.logout(req, res)
        req.clearCookie("convex-next")
    }
    catch(e) { }
    res.json({ success: "logged out user" })
}

export default handler