import axios from 'axios';
import React, { useState } from 'react'

function Doc({doc}) {

	const [docContent, setDocContent] = useState('')

	function getContentFromDoc() {
		axios.get(
			doc.url + "/contents" + "/readme.md"
		).then(
			response => {
				console.log('We got it!');
				setDocContent(atob(response.data.content))
			},
			error => {
				console.log('Ops, something is wrong...');
				setDocContent('There is no "readme" file...')
			}
		)
			
		//   return atob(response.data.content)
		// } ca (error) {
		//   return 'There is no "readme" file...'
		// }
	}

	return (
		<div className='doc'>
			<div className='doc__title'>
				<h4>{doc.name}</h4>
				<h5>{doc.url}</h5>
				<button onClick={()=>getContentFromDoc()}>Loh</button>
			</div>
			<div>
				{docContent
					? <div className='doc__content'><div>{docContent}</div></div>
					: <div></div>
				}
			</div>
		</div>
	)
}

export default Doc