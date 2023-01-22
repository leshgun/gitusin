import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux';

import store from "./store"

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

	const default_user = useSelector(state => state.defaultConfig.username);
	const [user, setUser] = useState(default_user);
	const [rate, setRate] = useState('');
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		// app start time initialization
		initTime();

		// choose theme depends on:
		// 1. saved user choice
		// 2. browser meta data
		let theme_item = localStorage.getItem("theme");
		let theme_pcs_dark = window.matchMedia("(prefers-color-scheme: dark)")
			.matches;
		if (theme_item)
			setTheme(theme_item);
		else if (theme_pcs_dark)
			setTheme("dark")
	}, []);

	useEffect(() => {
		// changing and saving the user's theme selection
		localStorage.setItem("theme", theme)
		document.getElementById("App").setAttribute("theme", theme)
	}, [theme])

	return (
		<div id="App">
			<Provider store={store}>
				<Header
					stateUser={[user, setUser]}
					stateTheme={[theme, setTheme]}
				/>
				<div className='wrapper'>
					<RepoList
						user={user}
					/>
				</div>
				{true
					? <RateLimit rate={rate} setRate={setRate}></RateLimit>
					: <div></div>
				}
			</Provider>
		</div>
	);
}

export default App;
