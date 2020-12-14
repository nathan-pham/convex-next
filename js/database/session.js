import { admin } from "./index"

const verify = async (session) => {
	return admin.auth().verifySessionCookie(session, true)
}

const create = (idToken, expiresIn) => {
	return admin.auth().createSessionCookie(idToken, { expiresIn })
}


const logout = async (req, res) => {
    const cookie = req.cookies["convex-next"]

	try {
		const claims = await verify(cookie)
		await admin.auth().revokeRefreshTokens(claims.sub)
	}
	catch(e) {
        
	}
}

export {
    create,
    logout,
    verify
}