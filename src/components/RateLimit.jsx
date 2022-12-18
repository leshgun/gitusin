import React, { useContext } from 'react'
import { MyContext } from '../App';

import DocService from "../API/DocService";
import "../styles/RateLimit.css"



function RateLimit() {

	const {rate, setRate, update_ratelimit} = useContext(MyContext);
	
	// // Force update ratelimit 
	// async function update_ratelimit ({force = false}) {
	// 	const response = await DocService.get_ratelimit(force);
	// 	setRate(`${response.used}/${response.limit}`);
	// }

	const help_text = ("The number of available GET requests");
	
	return (
		<div 
			id = "ratelimit"
			onClick = {() => { update_ratelimit(true) }}
			title = { help_text }
		>
			{rate}
		</div>
	)
}

export default RateLimit