import emojione from 'emojione';
import MyRequest from '../utils/MyRequest';

// It should be deleted in release!!!
const personalToken = "";

export default class DocService {
	static async getDocList(username) {
		return MyRequest.GET({
			url: `https://api.github.com/users/${username}/repos`,
			name: 'Leshgun',
			pat: personalToken
		})
	}

	static async getDocInfo(docURL) {
		try {
			let response = await MyRequest.GET({url: docURL});
			console.log('Response:\n', response);
			response = response.content.split('\n').reduce(
				(x,y) => x + emojione.shortnameToImage(atob(y)), ''
			)
			return response ? response : null;
			// return response 
			// 	? response.content.split('\n').reduce(
			// 		(x,y) => x + emojione.shortnameToImage(atob(y)), ''
			// 	)
			// 	: null;
		} catch (e) {
			console.log(e);
		}
	}
}