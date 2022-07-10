import './styles/App.css';

import React from 'react'
import Header from './components/Header';
import Posts from './components/Docs';

function App() {
	return (
		<div className="App">
			<div className='wrapper'>
				<Header />
				<Posts />
				In progress...
			</div>
		</div>
	);
}

export default App;
