import React, { createContext, useEffect, useState } from 'react'

import Header from './components/Header';
import RepoList from './components/RepoList';
import RateLimit from './components/RateLimit';

import './styles/App.css';
import './styles/Header.css';
import "../node_modules/github-markdown-css/github-markdown.css"

import mprint, { initTime } from './utils/myPrint';
import DocService from './API/DocService';


const default_parameters = {
	default_error: <h2>O-o-ops, something went wrong...</h2>,
	default_user: localStorage.getItem ("startup_user") || 'leshgun',
	ratelimit: ''
};


/**
 *	Main function
 */
function App() {

	const [user, setUser] = useState(default_parameters.default_user);
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

	/**
	 * @param {boolean} force make GET-request to check the current ratelimit
	 */
	async function update_ratelimit (force = false) {
		const response = await DocService.get_ratelimit(force);
		setRate(`${response.used}/${response.limit}`);
	}

	return (
		<div id="App">
			{/* Transfer some information for the child components */}
			<MyContext.Provider value={{
				rate: rate,
				setRate: (r) => setRate(r),
				update_ratelimit: () => update_ratelimit(),
				...default_parameters
			}}>
				<Header
					stateUser={[user, setUser]}
					stateTheme={[theme, setTheme]}
				/>
				<div className='wrapper'>
					<RepoList
						user={user}
					/>
				</div>
				{rate
					? <RateLimit rate={rate} setRate={setRate}></RateLimit>
					: <div></div>
				}
			</MyContext.Provider>
		</div>
	);
}

export default App;
export const MyContext = createContext({
	context: 'There is no any context...'
});
