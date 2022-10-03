import "../styles/OctoRate.css"

import React, { useEffect, useState } from 'react'
// import DocService from "../API/DocService";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles to be used (solid, regular, brands)
// import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
// import MyButton from "../UI/button/MyButton"
// import MyInput from "../UI/input/MyInput"

function OctoRate(props) {

	const [rate, setRate] = useState('');

	function getRate() {
		// const response = await DocService.getRate();
		setRate(localStorage.getItem('OctoRate'));
	}

	useEffect(() => {
		getRate();
		window.addEventListener("storage", () => {
			setRate(localStorage.getItem('OctoRate'))
			// getRate();
		});
		// When the component unmounts remove the event listener
		return () => {
			window.removeEventListener();
		}
	}, []);

	// const [inputValue, setInputValue] = useState('');	

	// function switchUser(newUser=inputValue) {
	// 	if (newUser && newUser !== user) {
	// 		setUser(newUser)
	// 		changeUser(newUser);
	// 		setInputValue('');
	// 	}
	// }

	// function onFormSubmit(e) {
	// 	e.preventDefault();
	// 	switchUser()
	// }

	return (
		<div 
			id="octo_rate"
			onClick={() => {getRate()}}
		>
			{/* {rate.used}/{rate.limit} */}
			{rate}
		</div>
	)
}

export default OctoRate