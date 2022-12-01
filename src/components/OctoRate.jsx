import "../styles/OctoRate.css"

import React, { useContext } from 'react'
import { MyContext } from '../App';

function OctoRate() {

	let {rate, setRate} = useContext(MyContext);

	function getRate() {
		// const response = await DocService.getRate();
		const lrate = localStorage.getItem('OctoRate');
		setRate(lrate);
	}

	return (
		<div 
			id="octo_rate"
			onClick={() => {getRate()}}
		>
			{rate}
		</div>
	)
}

export default OctoRate