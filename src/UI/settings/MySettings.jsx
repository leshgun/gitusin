import React, { useState } from 'react';

import MyInput from '../input/MyInput';
import MyModal from '../modal/MyModal';

import { onFormSubmit } from '../../utils/MyTools';
import mprint from '../../utils/myPrint';

import cl from './MySettings.module.css';

function MySettings({settings, setSettings}) {

	const defaultPat = 'ghp_88005553535';
	const [pat, setPat] = useState('');

	function changePat() {
		mprint('New PAT:', pat);
		localStorage.setItem('pat', pat);
		setPat('');
		setSettings(false);
	}

	function clToLocCl(str, cl) {
		return str.split(' ').reduce((x, y) => x + ' ' + cl[y], '');
	}

	return (
		<MyModal 
			visible={settings} setVisible={setSettings}
			show_modal_content={true}	
		>
			<div className={clToLocCl("fl-fd-c gap-1", cl)}>
				<div className={cl['title']}>Настройки</div>
				<div className={cl['content']}>
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
				</div>
			</div>
		</MyModal>
	)
}

export default MySettings
