import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import MyButton from '../button/MyButton';

import classes from './MyDropDown.module.css'

function MyDropDown({
	children=[<span key={'example'}>Example</span>], 
	className='',
	position='down',
	...props
}) {

	return (
		<div
			className={'dropdown' + ' ' + className}
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