const query = (url, body, abs) => {
    
	return fetch(abs || `/api/${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
    })
    .then(res => res.json())
    .catch(e => {
		return {
            error: e
        }
	})
}

export default query