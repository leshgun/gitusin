import React from 'react'

import "../styles/RateLimit.css"
import { useSelector } from 'react-redux';



function RateLimit() {
	
	const rete_counter = useSelector(state => state.rateCounter);

	
	// // Force update ratelimit 
	// async function update_ratelimit ({force = false}) {
	// 	const response = await DocService.get_ratelimit(force);
	// 	setRate(`${response.used}/${response.limit}`);
	// }

	const help_text = ("The number of available GET requests");
	
	return (
		<div 
			id = "ratelimit"
			// onClick = {() => { update_ratelimit(true) }}
			title = { help_text }
		>
			{`${rete_counter.used}/${rete_counter.limit}`}
		</div>
	)
}

export default RateLimit
