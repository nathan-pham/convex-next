import run from "./run"

const parse = str => {
	return str.split(';')
		.map(v => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
			return acc
		}, {})
}

const cookie = (req, res, fn) => {
    req.cookie = parse(req.headers.cookie)
    
    const destroy = (name) => {
        res.setHeader("Set-Cookie", `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`)    
    }

    req.clearCookie = destroy

    fn()
}

const handler = (req, res) => {
    return run(req, res, cookie)
}

export default handler