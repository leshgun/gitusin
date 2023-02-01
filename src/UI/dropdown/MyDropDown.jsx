import React from 'react'
import MyModal from '../modal/MyModal';

import cl from './MyDropDown.module.css'

function MyDropDown({
	children=[<span key={'example'}>Example</span>], 
	inner_class='', outer_class='',
	visible=false, setVisible,
	...props
}) {

	let root_classes = []
	root_classes = root_classes.concat(outer_class.split(' '));
	root_classes = root_classes.concat(inner_class.split(' ').map(x => cl[x] || ''));
	root_classes.push(cl['dropdown']);

	if (visible) {
		root_classes.push(cl['active'])
	}

	return (
		<div
			className={root_classes.join(' ')}
			{...props}
		>
			<ul
				className={cl['dropdown__content']}
			>
				{[].concat(children).map(
					(e, i) => <li 
						key={e.key ? e.key : Date.now()+i}
						className={cl['selectable']}
						// {...e.props}
					>{e}</li>
				)}
			</ul>
			<MyModal 
				visible = {visible} setVisible = {setVisible}
				outer_class = {cl['dropdown__modal']}
				show_modal_background = {false}
			/>
		</div>
	)
}

export default MyDropDown