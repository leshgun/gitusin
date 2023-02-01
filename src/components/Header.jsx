import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setName } from "store/slice-user";

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"

import "../styles/Header.css"
import ThemeSwitcher from './ThemeSwitcher';
import UserSwither from './UserSwither';
import Menu from './Menu';



function Header() {

	const reducers = useSelector(state => state);
	const dispatch = useDispatch();

	const startup_user = reducers.user.startup;
	const user = reducers.user.name;


	function switchToStartupUser() {
		if (user !== startup_user)
			dispatch(setName(startup_user));
	}


	return (
		<header>

			<div className="header__left-side">

				<div className="home">
					<FontAwesomeIcon 
						icon={solid('house-chimney')}
						size="xl"
						onClick={() => switchToStartupUser()}
					/>
				</div>
				<Menu />

			</div>

			<div className="header__right-side">

				<UserSwither />
				<ThemeSwitcher />

			</div>

		</header>
	)
}

export default Header
