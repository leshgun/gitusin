import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import DocService from '../API/DocService';
import MyButton from '../UI/button/MyButton';
import MyLoading from '../UI/loading/MyLoading';
import docFormat from '../utils/docFormat';
import mprint from '../utils/myPrint';

function Doc({doc, ...props}) {

	const [docContent, setDocContent] = useState('');
	const [btnName, setBtnName] = useState('More...');
	const [btnHide, setBtnHide] = useState(false);
	const [docContentHide, setDocContentHide] = useState(true);

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
		if (response.data) {
			response = response.data.map((x) => x.name);
			mprint('Docs found:', response);
			response = response.filter((x) => regex.test(x))
		} else {
			response = null;
		}
		// console.log('Docs filtered:', response);
		return response
	}

	async function getContentFromDoc() {
		const docEl = document.getElementById(doc.id);
		
		if (docEl.getAttribute('requested') == null) {
			docEl.toggleAttribute('requested');
			setBtnHide(true);
			const docs = await findDocs();
			if (docs && docs.length) {
				await getData(docs[0]);
				setBtnHide(false);
				setDocContentHide(!docContentHide);
			}
		} else {
			setDocContentHide(!docContentHide);
			if (!docContentHide && window.pageYOffset > docEl.offsetTop)
				window.scrollTo(0, docEl.offsetTop - 16);
		}
		setBtnName((btnName === 'More...') ? 'Less' : 'More...');
	}

	return (
		<div className='doc' id={doc.id} isconthide={docContentHide ? "true" : "false"}>
			{/* <div className='sticky'>
				<div className='sticky__child'>
					<p>Loh...</p>
				</div>
			</div> */}
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
						? 	<MyLoading size='md'/>
						: 	<MyButton 
								addClasses='outline' 
								onClick={()=>getContentFromDoc()}
							>
								{btnName}
							</MyButton>
				}
			</div>
			{docContentHide
				? <div className='doc__content'></div>
				: <div className='doc__content markdown-body dark-scheme'>
						<ReactMarkdown children={docContent} remarkPlugins={[remarkGfm]} />
					</div>
			}
		</div>
	)
}

export default Doc