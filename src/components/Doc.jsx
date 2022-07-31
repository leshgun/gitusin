import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DocService from '../API/DocService';

function Doc({doc, ...props}) {

	const [docContent, setDocContent] = useState('')
	const [btnName, setBtnName] = useState('More...');
	const listReadMeFiles = ["readme.md", "Readme.md", "README.md"]

	async function getContentFromDoc() {
		setBtnName((btnName === 'More...') ? 'Less' : 'More...');
		const doc_content = document.getElementById(doc.id);
		if (doc_content.getAttribute('requested') == null) {
			for (let i = 0; i < listReadMeFiles.length; i++){
				const responce = await DocService.getDocInfo(
					doc.url + "/contents/" + listReadMeFiles[i]
				);
				if (responce) setDocContent(responce);
			}
			doc_content.toggleAttribute('requested');
		} else doc_content.toggleAttribute('isHide');
	}

	return (
		<div className='doc' id={doc.id}>
			<div className='doc__title'>
				<div className='doc__name'>{doc.name}</div>
				<button onClick={()=>getContentFromDoc()}>{btnName}</button>
			</div>
			{docContent
				? <div className='doc__content markdown-body dark-scheme'>
						<ReactMarkdown children={docContent} remarkPlugins={[remarkGfm]} />
					</div>
				: <div></div>
			}
		</div>
	)
}

export default Doc