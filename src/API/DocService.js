import emojione from 'emojione';
import MyRequest from '../utils/MyRequest';

var Buffer = require('buffer/').Buffer

function base64ToUtf8(data) {
	return Buffer.from(data, 'base64').toString()
}

export default class DocService {

	static async getRepo(repo) {
		return await MyRequest.GET({
			url: `/repos/${repo}`
		});
	}

	static async getDocList(username) {
		return await MyRequest.GET({
			url: `/users/${username}/repos`
		})
	}

	static async getDoc(docName) {
		try {
			let response = await MyRequest.GET({
				url: `/repos/${docName}`,
			});
			response = response.data.content.replace('\n', '');
			response = base64ToUtf8(response);
			response = emojione.shortnameToImage(response);
			return response ? response : null;
		} catch (e) {
			// console.log('Request error: ', e);
		}
	}
}