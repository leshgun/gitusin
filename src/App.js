import React, { useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Header from './components/Header';
import Docs from './components/Docs';
import './styles/App.css';
import './styles/Header.css';

// It should be deleted in release!!!
const personalToken = "";

function App() {

	// const headerInputRef = useRef();
	const [docs, setDocs] = useState([
		{id: 'e8062f90b379d3725616354ff465139de8d3f1dc', name: 'test', content: 'Test text for the test doc'}
	]);

	async function fetchDocs() {
		const response = await axios.get(
			"https://api.github.com/users/leshgun/repos",
			{key: "value"},
			{headers: { authorization: `Basic ${btoa('Leshgun:' + personalToken)}` }}
		);
		setDocs(response.data)
	}

	function changeUser(username) {
		console.log('Target user:', username);
		fetchDocs()
	}

	return (
		<div className="App">
			<div className='wrapper'>
				<Header onChange={changeUser} />
				<Docs docs={docs}/>
				In progress...
			</div>
		</div>
	);
}

export default App;
