import "../styles/Header.css"

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Header({onChange}) {

	const [user, setUser] = useState('leshgun')

	return (
		<header>
			<div className="home">
				<FontAwesomeIcon icon={solid('house-chimney') } size="xl" />
			</div>
			<div className="user-name_input">
				<h5>User:</h5>
				<input 
					placeholder={user} 
					type="text"
					title="Choose user to get info about"
					onChange={e => setUser(e.target.value)}
				/>
				<button onClick={e => onChange(user)}>Get</button>
			</div>
		</header>
	)
}

export default Header