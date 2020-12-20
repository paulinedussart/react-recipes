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

export async function apiFetch(url, options = {}) {
	const apiOptions = {
		credentials: 'include',
		headers: {
			'Accept': 'application/json'
		}, 
		...options
	}
	if (apiOptions.body !== null && typeof apiOptions.body === 'object' && !(apiOptions.body instanceof FormData) ) {
		apiOptions.body = JSON.stringify(apiOptions.body)
		apiOptions.headers['Content-Type'] = 'application/json'
	}
	const response = await fetch("http://localhost:3333" + url, apiOptions )
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