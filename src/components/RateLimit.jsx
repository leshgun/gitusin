import React from 'react'

import "../styles/RateLimit.css"
import { useSelector } from 'react-redux';



function RateLimit() {
	
	// // Force update ratelimit 
	// async function update_ratelimit ({force = false}) {
	// 	const response = await DocService.get_ratelimit(force);
	// 	setRate(`${response.used}/${response.limit}`);
	// }
	
	
	const rate_counter = useSelector(state => state.rateCounter);
		
	return (
		<div 
			id = "ratelimit"
			// onClick = {() => { update_ratelimit(true) }}
			title = { rate_counter.help_text }
		>
			{`${rate_counter.used}/${rate_counter.limit}`}
		</div>
	)
}

export default RateLimit
