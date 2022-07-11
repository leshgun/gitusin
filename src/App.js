import React, { useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Header from './components/Header';
import Posts from './components/Docs';
import './styles/App.css';
import './styles/Header.css';

function App() {

	// const headerInputRef = useRef();
	const [docs, setDocs] = useState([
		{sha: 'e8062f90b379d3725616354ff465139de8d3f1dc', title: 'test', content: 'Test text for the test doc'}
	]);

	async function fetchDocs() {
		const response = await axios.get('https://api.github.com/repos/leshgun/about/contents/readme.md');
		// console.log(
		// 	{
		// 		sha: response.data.sha,
		// 		title: response.data.name,
		// 		content: atob(response.data.content)
		// 	}
		// )
		setDocs([{
			sha: response.data.sha,
			title: response.data.name,
			content: atob(response.data.content)
		}]);
		// console.log(response.data);
		// return {
		// 	sha: response.data.sha,
		// 	title: response.data.name,
		// 	content: atob(response.data.content)
		// }
	}

	function changeUser(username) {
		console.log('Target user:', username);
		console.log(fetchDocs())
	}

	return (
		<div className="App">
			<div className='wrapper'>
				<Header onChange={changeUser} />
				<Posts docs={docs}/>
				In progress...
			</div>
		</div>
	);
}

export default App;
