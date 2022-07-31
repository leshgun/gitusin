import React from 'react'
import classes from './MyInput.module.css'

function MyInput({addClasses='', ...props}) {
	addClasses = addClasses.split(',').map(x => classes[x] || '')
	return (
		// <input className={classes.btn + ' ' + addClasses.join(' ')} {...props}>
		// 	{children}
		// </input>
		<input 
			// placeholder={user} 
			// type="text"
			// title="Choose user to get info about"
			// onChange={e => setUser(e.target.value)}
			className={classes.myInput + ' ' + addClasses.join(' ')}
			{...props}
		/>
	)
}

export default MyInput