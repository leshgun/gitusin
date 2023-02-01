import React, { useState, useEffect } from "react";

import MyInput from "UI/input/MyInput";
import MyModal from "UI/modal/MyModal";

import { onFormSubmit } from "utils/MyTools";
import mprint from "utils/myPrint";

import "styles/Settings.css";

function Settings({settings, setSettings, ...props}) {

	const pat_example = 'ghp_88005553535';
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
		if (props.setStartupUser) props.setStartupUser(startupUser);
		setStartupUser('');
	}
	


	return (
		<MyModal 
			visible={settings} setVisible={setSettings}
			show_modal_content={true}
		>
			<div id="settings">
				<div className="settings_title">Настройки</div>
				<div className="settings_body">
					<form onSubmit={(e) => onFormSubmit(e, changePat)}>
						<div className="settings__item">
							<div>PAT:</div>
							<MyInput
								placeholder={localStorage.getItem('pat') 
									|| pat_example}
								type="text"
								title="Enter your personal acsess token here"
								onChange={e => setPat(e.target.value)}
							/>
						</div>
					</form>
					<form onSubmit={(e) => onFormSubmit(e, change_startup_user)}>
						<div className="settings__item">
							<div>User at startup:</div>
							<MyInput
								placeholder = {
									localStorage.getItem("startup_user") ||
									props["startup_user"] ||
									''
								}
								type="text"
								title="Enter username to see at startup of the app."
								value = { startupUser }
								onChange={ e => setStartupUser(e.target.value) }
							/>
						</div>
					</form>
				</div>
			</div>
		</MyModal>
	)
}

export default Settings
