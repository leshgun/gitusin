import axios from "axios";
import { Octokit } from 'octokit';
import mprint from "./myPrint";


const githubAPI = 'https://api.github.com'


class MyOcto {
	
	static octokitRequestOptions = {
		auth: localStorage.getItem('pat') || ''
	};

	static octokit = new Octokit ({
		...this.octokitRequestOptions
	})

	static async setRate(rate) {
		localStorage.setItem('ratelimit', `${rate.used}/${rate.limit}`);
		localStorage.setItem("ratelimit_used", rate.used);
		localStorage.setItem("ratelimit_limit", rate.limit);
	}

	static async getRate() {
		let octoRate = await this.octokit.request('GET /rate_limit', {});
		return octoRate.data.rate || '';
		// console.log('Limit:', octoRate.data.rate);
		// this.setRate(octoRate);
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
				return {error: err}
			}
		)
		if (response && !response.error)
			this.setRate({
				used: response.headers['x-ratelimit-used'],
				limit: response.headers['x-ratelimit-limit']
			})
		return response ? response : null;
	}

}




export class MyAxios {

	static axiosRequestOptions = {
		responseType: 'json',
		responseEncoding: 'utf8',
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `token ${localStorage.getItem('pat')}`
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

	static async get_ratelimit() {
		const response = await MyOcto.getRate();
		MyOcto.setRate(response);
		return response;
	}

}