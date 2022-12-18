import React, { useState, useEffect } from 'react';

import MyInput from '../input/MyInput';
import MyModal from '../modal/MyModal';

import { onFormSubmit } from '../../utils/MyTools';
import mprint from '../../utils/myPrint';

import cl from './MySettings.module.css';

function MySettings({settings, setSettings, ...props}) {

	const defaultPat = 'ghp_88005553535';
	const [pat, setPat] = useState('');
	const [startupUser, setStartupUser] = useState('');


	useEffect(() => {
		// Initialize the github personal access token
		// It needs for the requests to GitHub API
		if (!localStorage.getItem('pat'))
			localStorage.setItem('pat', '');
	}, [])


	function changePat() {
		mprint('New PAT:', pat);
		localStorage.setItem('pat', pat);
		setPat('');
		setSettings(false);
	}

	function change_startup_user () {
		console.log("New startup user:", startupUser);
		console.log("Props:", props);
		localStorage.setItem("startup_user", startupUser);
		setStartupUser('');
	}

	function clToLocCl(str, cl) {
		return str.split(' ').reduce((x, y) => x + ' ' + cl[y], '');
	}
	


	return (
		<MyModal 
			visible={settings} setVisible={setSettings}
			show_modal_content={true}	
		>
			<div className={clToLocCl("fl-fd-c gap-2", cl)}>
				<div className={cl['title']}>Настройки</div>
				<div className={ clToLocCl("content fl-fd-c gap-1", cl) }>
					<form onSubmit={(e) => onFormSubmit(e, changePat)}>
						<div className={clToLocCl("fl-jc-sb fl-fd-r gap-1", cl)}>
							<div>PAT:</div>
							<MyInput
								placeholder={localStorage.getItem('pat') || defaultPat}
								type='text'
								title='Enter your personal acsess token here'
								onChange={e => setPat(e.target.value)}
							/>
						</div>
					</form>
					<form onSubmit={(e) => onFormSubmit(e, change_startup_user)}>
						<div className={clToLocCl("fl-jc-sb fl-fd-r gap-1", cl)}>
							<div>User at startup:</div>
							<MyInput
								placeholder = {
									localStorage.getItem('startup_user') ||
									props['startup_user'] ||
									''
								}
								type='text'
								title='Enter username to see at startup of the app.'
								value = {startupUser}
								onChange={e => setStartupUser(e.target.value)}
							/>
						</div>
					</form>
				</div>
			</div>
		</MyModal>
	)
}

export default MySettings
