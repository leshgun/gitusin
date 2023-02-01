import React from 'react'

import cl from './MyError.module.css'

function MyError({response, errorMsg}) {
	
	const errorDef = `Внутренняя ошибка сервера.
		Пожалуйста, проверьте подключение к интернету.`
	const error = response.error;
	let children = [];

	if (error.status) children.push(
		<span key={'error-code'}>Error: {response.error.status}</span>
	);

	if (error.response) children.push(
		<span key={'error-message'}>
			{response.error.response.data.message}
		</span>
	); 
	else children.push(
		<span key={'error-message'}>
			{errorMsg || errorDef}
		</span>
	);

	return (
		<h5 className={`${cl['fl-c']} ${cl['fl-d-c']}`}>{children}</h5>
	)
}

export default MyError