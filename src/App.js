import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Header from './components/Header';
import Docs from './components/DocList';
import OctoRate from './components/OctoRate';
import './styles/App.css';
import './styles/Header.css';
import "../node_modules/github-markdown-css/github-markdown.css"
import DocService from './API/DocService';
import {initTime} from './utils/myPrint';

const defaultUser = 'leshgun'

function App() {

	const [docs, setDocs] = useState([]);

	useEffect(() => {
		fetchDocs(defaultUser);
		initTime();
	}, []);

	async function fetchDocs(username) {
		const response = await DocService.getDocList(username);
		if (response) setDocs(response)
	}

	function changeUser(username) {
		console.log('Target user:', username);
		fetchDocs(username ? username : defaultUser)
	}

	return (
		<div className="App">
			<Header 
				changeUser={changeUser}
				defaultUser={defaultUser}
			/>
			<div className='wrapper'>
				<Docs docs={docs}/>
			</div>
			{ localStorage.getItem('OctoRate')
				? <OctoRate></OctoRate>
				: <div></div>
			}
		</div>
	);
}

export default App;
