import axios from "axios";
import { Octokit } from 'octokit';
// import mprint from "./myPrint";


const githubAPI = 'https://api.github.com'
const pat = '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';




class MyOcto {
	
	static octokitRequestOptions = {
		// auth: pat
	};
	static octokit = new Octokit ({
		...this.octokitRequestOptions
	})

	static async setRate(rate) {
		localStorage.setItem('OctoRate', `${rate.used}/${rate.limit}`);
	}

	static async getRate() {
		let octoRate = await this.octokit.request('GET /rate_limit', {});
		octoRate = octoRate.data.rate;
		// console.log('Limit:', octoRate.data.rate);
		this.setRate(octoRate);
	}

	static async GET(url, headers) {
		const response = await this.octokit.request(
			`GET ${url}`,
			{
				headers: headers
			}
		)
		.catch(
			err => {
				console.log('--- Error:', err);
			}
		)
		this.setRate({
			used: response.headers['x-ratelimit-used'],
			limit: response.headers['x-ratelimit-limit']
		})
		return response ? response.data : null;
	}

}




export class MyAxios {

	static axiosRequestOptions = {
		responseType: 'json',
		responseEncoding: 'utf8',
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `token ${pat}`
		}
	}

	static async GET(url, options) {
		return axios.get(
			githubAPI + url,
			{
				...this.axiosRequestOptions,
				...options
			}
		).then(
			response => {
				return response.data;
			},
			error => {
				// console.log(`Error: ${error}...`);
				return null;
			}
		);
	}

}




export default class MyRequest {

    static async GET({url, ...headers}) {
		// return MyAxios.GET(url, headers);
		const response = await MyOcto.GET(url, headers);
		// MyOcto.getRate();
		return response;
    }

}