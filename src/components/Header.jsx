import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setName, setStartupUser } from "store/slice-user";

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"

import MyButton from "UI/button/MyButton"

import MyDropDown from "UI/dropdown/MyDropDown"
import MySettings from "UI/settings/MySettings"

import { toggleVisible } from "../utils/MyTools"
import "../styles/Header.css"
import ThemeSwitcher from './ThemeSwitcher';
import UserSwither from './UserSwither';



function clear_local_storage() {
	localStorage.clear();
	window.location.reload();
}


function Header() {

	const reducers = useSelector(state => state);
	const dispatch = useDispatch();

	const startup_user = reducers.user.startup;
	const user = reducers.user.name;

	const [options, setOptions] = useState(false);
	const [settings, setSettings] = useState(false);


	function switchToStartupUser() {
		if (user !== startup_user)
			dispatch(setName(startup_user));
	}


	return (
		<header>

			<div className="header__left-side">
				{/* Logo */}
				<div className="home">
					<FontAwesomeIcon 
						icon={solid('house-chimney')}
						size="xl"
						onClick={() => switchToStartupUser()}
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
						startup_user = { startup_user }
						setStartupUser = {
							username => dispatch(setStartupUser(username))
						}
					/>
				</div>
			</div>

			<div className="header__right-side">

				<UserSwither />
				<ThemeSwitcher />

			</div>

		</header>
	)
}

export default Header
