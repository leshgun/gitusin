import React from 'react'

import cl from './MyModal.module.css'

function MyModal({children, visible, setVisible}) {

	const modal_classes = [cl['myModal']]

	if (visible) {
		modal_classes.push(cl['active']);
	}

	return (
		<div 
			className={modal_classes.join(' ')}
			onClick={() => setVisible(false)}
		>
			<div 
				className={cl['myModal__content']}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default MyModal