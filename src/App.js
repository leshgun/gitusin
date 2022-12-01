import React, { createContext, useEffect, useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import Header from './components/Header';
import Docs from './components/DocList';
import OctoRate from './components/OctoRate';
import './styles/App.css';
import './styles/Header.css';
import "../node_modules/github-markdown-css/github-markdown.css"
import {initTime} from './utils/myPrint';

const defParams = {
	defaultError: <h2>O-o-ops, something went wrong...</h2>,
	defaultUser: 'leshgun',
	octoRate: ''
};

function App() {

	const [user, setUser] = useState(defParams.defaultUser);
	const [rate, setRate] = useState('');
	const [theme, setTheme] = useState('light')

	useEffect(() => {
		initTime();
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme)
		document.getElementById("App").setAttribute("theme", theme)
	}, [theme])

	return (
		<div id="App">
			<MyContext.Provider value={{
				rate: rate,
				setRate: (r) => setRate(r),
				...defParams
			}}>
				<Header
					stateUser={[user, setUser]}
					stateTheme={[theme, setTheme]}
				/>
				<div className='wrapper'>
					<Docs
						user={user}
					/>
				</div>
				{rate
					? <OctoRate rate={rate} setRate={setRate}></OctoRate>
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