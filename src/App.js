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
import mprint, {initTime} from './utils/myPrint';

const defaultUser = 'leshgun'

function App() {

	const [docs, setDocs] = useState([]);
	const [requestError, setRequestError] = useState(false);

	const errorDef = `Внутренняя ошибка сервера.
		Пожалуйста, проверьте подключение к интернету.`

	useEffect(() => {
		initTime();
		fetchDocs(defaultUser);
	}, []);

	async function fetchDocs(username) {
		setDocs([]);
		setRequestError(false);
		const response = await DocService.getDocList(username);
		if (response.data) {
			if (response.data.length) setDocs(response.data);
			console.log(response.data);
			setRequestError(<h5>There is no public repos...</h5>)
		}
		else {
			console.log(response.error.request);
			console.log(response.error.response);
			setRequestError(
				<h5 className='fl-c fl-d-c'>
					<span>Error: {response.error.status}</span>
					<span>{response.error.response.data.message || errorDef}</span>
				</h5>
			);
		}
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
				<Docs docs={docs} error={requestError}/>
			</div>
			{ localStorage.getItem('OctoRate')
				? <OctoRate></OctoRate>
				: <div></div>
			}
		</div>
	);
}

export default App;
