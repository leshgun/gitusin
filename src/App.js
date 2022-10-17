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
	defaultUser: 'leshgun',
	defaultError: <h2>O-o-ops, something went wrong...</h2>
};

function App() {

	const [user, setUser] = useState(defParams.defaultUser);

	useEffect(() => {
		initTime();
	}, []);

	return (
		<div className="App">
			<MyContext.Provider value={defParams}>
				<Header 
					user={user}
					setUser={setUser}
				/>
				<div className='wrapper'>
					<Docs
						user={user}
					/>
				</div>
				{localStorage.getItem('OctoRate')
					? <OctoRate></OctoRate>
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