import React, { useState, useContext } from 'react'

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"

import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MyDropDown from "../UI/dropdown/MyDropDown"
import MySettings from "../UI/settings/MySettings"
import { MyContext } from '../App'

import { onFormSubmit, toggleVisible } from "../utils/MyTools"
import "../styles/Header.css"



function clear_local_storage() {
	localStorage.clear();
	window.location.reload();
}


function Header({stateUser, stateTheme}) {

	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState(false);
	const [settings, setSettings] = useState(false);
	const { default_user } = useContext(MyContext)
	const [user, setUser] = stateUser;
	const [theme, setTheme] = stateTheme;


	function switch_target_user ( username = inputValue ) {
		if (username && username !== user) {
			setUser(username);
			setInputValue('');
		}
	}

	function switch_theme () {
		if (theme === "light") {
			setTheme("dark")
		} else {
			setTheme("light")
		}
	}

	return (
		<header>

			<div className="header__left-side">
				
				{/* Logo */}
				<div className="home">
					<FontAwesomeIcon 
						icon={solid('house-chimney')}
						size="xl"
						onClick={() => switch_target_user(default_user)}
					/>
				</div>

				<div id="options">
					<MyButton 
						inner_class='secondary'
						type='submit'
						onClick={() => toggleVisible(options, setOptions)}
						>
						<div className='dd__button'>
							<i><FontAwesomeIcon 
								icon = {solid("bars")}
								size = "1x"
							/></i>
							{/* Options
							<i><FontAwesomeIcon 
								icon={solid("caret-down")} size="xs" 
							/></i> */}
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
							onClick={() => clear_local_storage()}
						>refresh</span>
					</MyDropDown>
					<MySettings
						key='settings'
						settings = { settings }
						setSettings = { setSettings }
						startup_user = { default_user }
					/>
				</div>

			</div>

			<div className="header__right-side">

				{/**
				 * 	Form for changing the target user by button or "Enter"-key
				 */}
				<form onSubmit={(e) => onFormSubmit(e, switch_target_user)}>
					<MyInput 
						placeholder={user}
						type="text"
						title="Choose user to get info about"
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
					/>
					<MyButton 
						inner_class='primary'
						type='submit'
					>Get</MyButton>
				</form>

				<div className="theme_switcher">
					<FontAwesomeIcon
						icon={solid("moon")}
						size="xl"
						onClick={() => switch_theme()}
					/>
				</div>

			</div>

		</header>
	)
}

export default Header
