import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DocService from '../API/DocService';
import MyButton from '../UI/button/MyButton';
import docFormat from '../utils/docFormat';
import mprint from '../utils/myPrint';

function Doc({doc, ...props}) {

	const [docContent, setDocContent] = useState('');
	const [btnName, setBtnName] = useState('More...');
	const [btnHide, setBtnHide] = useState(false);

	async function getData(path) {
		let response = await DocService.getDoc(
			doc.full_name + "/contents/" + path
		);
		if (response) {
			response = docFormat(doc, response);
			if (response) setDocContent(response);
		}
	}

	async function findDocs() {
		const regex = /readme/i;
		let response = await DocService.getRepo (
			doc.full_name + "/contents/"
		);
		if (!response) return null;
		response = response.map((x) => x.name);
		mprint('Docs found:', response);
		response = response.filter((x) => regex.test(x))
		// console.log('Docs filtered:', response);
		return response
	}

	async function getContentFromDoc() {
		const doc_content = document.getElementById(doc.id);
		
		if (doc_content.getAttribute('requested') == null) {
			doc_content.toggleAttribute('requested');
			setBtnHide(true);
			const docs = await findDocs();
			if (docs && docs.length) {
				getData(docs[0]);
				setBtnHide(false);
			}
			// console.log('--- Docs:', docs);
		} else doc_content.toggleAttribute('isHide');
		setBtnName((btnName === 'More...') ? 'Less' : 'More...');
	}

	return (
		<div className='doc' id={doc.id}>
			<div className='doc__title'>
				<a
					target="_blank"
					rel="noopener noreferrer"
					className='doc__name'
					href={doc.html_url}
				>{doc.name}</a>
				{/* <button onClick={()=>getContentFromDoc()}>{btnName}</button> */}
				{
					btnHide
						? 	<div className='outline'></div>
						: 	<MyButton 
								addClasses='outline' 
								onClick={()=>getContentFromDoc()}
							>
								{btnName}
							</MyButton>
				}
				
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