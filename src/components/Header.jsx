import React, { useState, useEffect } from 'react'

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MyDropDown from "../UI/dropdown/MyDropDown"

import {onFormSubmit, toggleVisible} from '../utils/MyTools'

import "../styles/Header.css"
import MySettings from '../UI/settings/MySettings'

import { useContext } from 'react';
import { MyContext } from '../App';


function Header({stateUser, stateTheme, defaultUser='leshgun'}) {

	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState(false);
	const [settings, setSettings] = useState(false);
	const [user, setUser] = stateUser;
	const [theme, setTheme] = stateTheme;


	useEffect(() => {
		if (!localStorage.getItem('pat'))
			localStorage.setItem('pat', '');
	}, [])
	
	function clearStorage() {
		localStorage.clear();
		window.location.reload();
	}

	function switchUser(newUser=inputValue) {
		if (newUser && newUser !== user) {
			setUser(newUser);
			setInputValue('');
		}
	}

	function switchTheme() {
		if (theme === "light") {
			setTheme("dark")
		} else {
			setTheme("light")
		}
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
				<div id="options">
					<MyButton 
						inner_class='secondary'
						type='submit'
						onClick={() => toggleVisible(options, setOptions)}
					>
						<div className='dd__button'>
							Options
							<i><FontAwesomeIcon icon={solid("caret-down")} size="xs" /></i>
						</div>
					</MyButton>
					<MyDropDown
						visible={options}
						setVisible={setOptions}
					>
						<div 
							id={'settings'} 
							key={'settings'}
							onClick={() => {
								setSettings(true);
								setOptions(false);
							}}
						>settings</div>
						<span 
							key={'refresh'}
							onClick={() => clearStorage()}
						>refresh</span>
					</MyDropDown>
					<MySettings
						key='settings'
						settings={settings}
						setSettings={setSettings}
					/>
				</div>
			</div>
			<div className="header__right-side">
				<form onSubmit={(e) => onFormSubmit(e, switchUser)}>
					<MyInput 
						placeholder={user}
						type="text"
						title="Choose user to get info about"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					{/* <button onClick={e => onChange(user)}>Get</button> */}
					<MyButton 
						inner_class='primary'
						type='submit'
						// onClick={() => switchUser()}
					>Get</MyButton>
				</form>
				<div className="dark_theme">
					<FontAwesomeIcon
						icon={solid("moon")}
						size="xl"
						onClick={() => switchTheme()}
					/>
				</div>
			</div>
		</header>
	)
}

export default Header
