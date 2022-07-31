import React from 'react'
import classes from './MyButton.module.css'

function MyButton({children='Button', addClasses='', ...props}) {
	addClasses = addClasses.split(',').map(x => classes[x] || '')
	return (
		<button className={classes.btn + ' ' + addClasses.join(' ')} {...props}>
			{children}
		</button>
	)
}

export default MyButton