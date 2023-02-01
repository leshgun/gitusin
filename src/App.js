import React, { useEffect } from 'react'

import Header from './components/Header';
import RepoList from './components/RepoList';
import RateLimit from './components/RateLimit';

import './styles/App.css';
import './styles/Header.css';
import "../node_modules/github-markdown-css/github-markdown.css"

import { initTime } from './utils/myPrint';


/**
 *	Main function
 */
function App() {

	useEffect(() => {
		// app start time initialization
		initTime();
	}, []);

	return (
		<div id="App">
			<Header />
			<div className='wrapper'>
				<RepoList />
			</div>
			{true
				? <RateLimit />
				: <div></div>
			}
		</div>
	);
}

export default App;
