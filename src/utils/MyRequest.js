import axios from "axios";

export default class MyRequest {

    static async GET({url, name, pat}) {
        return axios.get(
			url,
			{headers: { authorization: `Basic ${btoa(name + ':' + pat)}` }}
		).then(
			response => {
				return response.data;
			},
			error => {
				console.log(`Error: ${error}...`);
				return null;
			}
		);
    }

}