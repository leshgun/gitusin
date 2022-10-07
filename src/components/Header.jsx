import React, { useState, useEffect } from 'react'

// import styles to be used (solid, regular, brands)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'

import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MyDropDown from "../UI/dropdown/MyDropDown"
import MyModal from '../UI/modal/MyModal'

import mprint from '../utils/myPrint'

import "../styles/Header.css"


function Header({changeUser, defaultUser, ...props}) {

	const [user, setUser] = useState(defaultUser);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState(false);
	const [settings, setSettings] = useState(false);
	const [pat, setPat] = useState('');

	const defaultPat = 'ghp_88005553535';

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
			setUser(newUser)
			changeUser(newUser);
			setInputValue('');
		}
	}

	function changePat() {
		mprint('New PAT:', pat);
		localStorage.setItem('pat', pat);
		setPat('');
		setSettings(false);
	}

	function onFormSubmit(e, callback) {
		e.preventDefault();
		callback();
	}

	function toggleVisible(state, callback) {
		callback(!state);
	}

	// function openDropDown(id) {
		// const parent = document.getElementById(id);
		// const dd = parent.getElementsByClassName('dropdown')[0];
		// dd.classList.toggle('open');
	// }

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
						addClasses='secondary'
						type='submit'
						onClick={() => toggleVisible(options, setOptions)}
					>
						<i><FontAwesomeIcon icon={solid("caret-down")} size="xs" /></i>
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
					<MyModal visible={settings} setVisible={setSettings}>
						<div className='fl-fd-c gap-1'>
							<div className='title'>Настройки</div>
							<div className='content'>
								<form onSubmit={(e) => onFormSubmit(e, changePat)}>
									<div className='fl-jc-sb'>
										<div>PAT:</div>
										<MyInput
											placeholder={localStorage.getItem('pat') || defaultPat}
											type='text'
											title='Enter your personal acsess token here'
											onChange={e => setPat(e.target.value)}
										/>
									</div>
								</form>
							</div>
						</div>
					</MyModal>
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