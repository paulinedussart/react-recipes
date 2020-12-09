// represents an error returned by my API
export class ApiError {
	constructor(errors) {
		this.errors = errors
	}
}

/**
 * @param {string} url 
 * @param {object} options 
 */

export async function apiFetch (url, options = {}) {
	const response = await fetch("http://localhost:3333" + url, {
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}, 
		...options
	})
	// 204 = "no body"
	if (response.status === 204) {
		return null;
	}

	const responseData = await response.json()
	if (response.ok) { 
		return responseData;
	} else {
		if (responseData.errors) {
			throw new ApiError(responseData.errors)
		}
	}
}