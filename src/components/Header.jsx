import "../styles/Header.css"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import styles to be used (solid, regular, brands)
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"

function Header({changeUser, defaultUser}, ...props) {

	const [user, setUser] = useState(defaultUser);
	const [inputValue, setInputValue] = useState('');	

	function switchUser(newUser=inputValue) {
		if (newUser && newUser !== user) {
			setUser(newUser)
			changeUser(newUser);
			setInputValue('');
		}
	}

	function onFormSubmit(e) {
		e.preventDefault();
		switchUser();
	}

	return (
		<header>
			<form onSubmit={onFormSubmit}>
				<div className="home">
					<FontAwesomeIcon 
						icon={solid('house-chimney')}
						size="xl"
						onClick={() => switchUser(defaultUser)}
					/>
				</div>
				<div className="user-name_input">
					{/* <h5>User:</h5> */}
					{/* <input 
						placeholder={user} 
						type="text"
						title="Choose user to get info about"
						onChange={e => setUser(e.target.value)}
					/> */}
					<MyInput 
						placeholder={user}
						type="text"
						title="Choose user to get info about"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					{/* <button onClick={e => onChange(user)}>Get</button> */}
					<MyButton 
						addClasses='primary'
						type='submit'
						// onClick={() => switchUser()}
					>Get</MyButton>
				</div>
			</form>
		</header>
	)
}

export default Header