import React from 'react'
import cl from './MyButton.module.css'

function MyButton({children='Button', inner_class='', outer_class='', ...props}) {
	let classes = [];
	classes = classes.concat(outer_class.split(' '));
	classes = classes.concat(inner_class.split(' ').map(x => cl[x] || ''));
	classes.push(cl.btn);
	return (
		<button className={classes.join(' ')} {...props}>
			{children}
		</button>
	)
}

export default MyButton
