import React from 'react'

import classes from './MyDropDown.module.css'

function MyDropDown({
	children=[<span key={'example'}>Example</span>], 
	className='',
	visible=false,
	setVisible,
	...props
}) {

	const rootClasses = [classes['dropdown'], className];

	if (visible) {
		rootClasses.push(classes['active'])
	}

	return (
		<div
			className={rootClasses.join(' ')}
			{...props}
		>
			<ul 
				className={classes['dropdown__content']}
			>
				{[].concat(children).map(
					(e, i) => <li 
						key={e.key ? e.key : Date.now()+i}
						className={classes['selectable']}
						// {...e.props}
					>{e}</li>
				)}
			</ul>
		</div>
	)
}

export default MyDropDown