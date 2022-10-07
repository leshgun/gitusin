import React, { useState } from 'react'

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MyDropDown from "../UI/dropdown/MyDropDown"

import "../styles/Header.css"


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

	function openDropDown(id) {
		const parent = document.getElementById(id);
		const dd = parent.getElementsByClassName('dropdown')[0];
		dd.classList.toggle('open');
	}

	return (
		<header>
			<div className="header__left-side">
				<div className="home">
					<FontAwesomeIcon 
						icon={solid('house-chimney')}
						size="xl"
						onClick={() => switchUser(defaultUser)}
					/>
				</div>
				<div id="settings">
					<MyButton 
						addClasses='secondary'
						type='submit'
						onClick={() => openDropDown('settings')}
					>
						<i><FontAwesomeIcon icon={solid("caret-down")} size="xs" /></i>
						Settings
					</MyButton>
					<MyDropDown>
						<div id={'pat'} key={'pat'}>
							<span>PAT</span>
						</div>
						<span key={'theme'}>PAT 2</span>
						<span>Test</span>
						{/* <span>PAT 3</span> */}
					</MyDropDown>
				</div>
			</div>
			<div className="header__right-side">
				<form onSubmit={onFormSubmit}>
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
				</form>
			</div>
		</header>
	)
}

export default Header