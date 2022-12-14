import React from 'react'

import cl from './MyModal.module.css'

function MyModal({
	children, 
	visible, setVisible, 
	inner_class = '', outer_class = '',
	show_modal_content = false,
	show_modal_background = true
}) {

	let modal_classes = [];
	modal_classes = modal_classes.concat(outer_class.split(' '));
	modal_classes = modal_classes.concat(inner_class.split(' ').map(x => cl[x] || ''));
	modal_classes.push(cl['myModal']);

	let modal_content_classes = [cl['myModal__content']]

	if (visible)
		modal_classes.push(cl['active']);

	if (!show_modal_background)
		modal_classes.push(cl['transparent'])

	return (
		<div 
			className={modal_classes.join(' ')}
			onClick={() => setVisible(false)}
		>
			<div 
				className={modal_content_classes.join(' ')}
				onClick={e => e.stopPropagation()}
				hidden={!show_modal_content}
			>
				{children}
			</div>
		</div>
	)
}

export default MyModal