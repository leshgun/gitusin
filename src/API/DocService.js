import emojione from 'emojione';

import mprint from '../utils/myPrint';
import MyRequest from '../utils/MyRequest';

var Buffer = require('buffer/').Buffer

function base64_to_utf8(data) {
	return Buffer.from(data, 'base64').toString()
}

export default class DocService {

	// Get ratelimit of the requests 
	static get_ratelimit (force=false) {
		if (force)
			return MyRequest.get_ratelimit();
		return {
			"ratelimit": localStorage.getItem('ratelimit_limit'),
			"used": localStorage.getItem('ratelimit_used'),
			"limit": localStorage.getItem('ratelimit_limit')
		};
	}

	// Get all repositories of the current user
	static async get_repos (username) {
		return await MyRequest.GET({
			url: `/users/${username}/repos`
		});
	}

	// Get all docs from given repository
	static async get_docs (repo) {
		return await MyRequest.GET({
			url: `/repos/${repo}`
		});
	}

	// Fetch "Readme" files from repository 
	static async get_readme_docs (repo_name) {
		const regex = /readme/i;
		let docs = []

		let response = await DocService.get_docs (
			repo_name + "/contents/"
		);
		
		if (response && response.data) {
			response = response.data.map((x) => x.name);
			mprint('Docs found:', response);
			docs = response.filter((x) => regex.test(x))
		}
		
		return docs
	}

	// Get data from doc
	static async getDoc(docName) {
		try {
			let response = await MyRequest.GET({
				url: `/repos/${docName}`,
			});
			response = response.data.content.replace('\n', '');
			response = base64_to_utf8(response);
			response = emojione.shortnameToImage(response);
			return response ? response : null;
		} catch (e) {
			// console.log('Request error: ', e);
		}
	}
}
