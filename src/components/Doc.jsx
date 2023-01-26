import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// import { updateRatelimit } from '../store/slice-rate-counter';
import MyButton from '../UI/button/MyButton';
import MyLoading from '../UI/loading/MyLoading';

import DocService from '../API/DocService';
import docFormat from '../utils/docFormat';

import "../styles/Doc.css"



// function get_all_properties(o, e = o, props = []) {
// 	if (e.__proto__) 
// 		get_all_properties(o, e.__proto__, 
// 			props.concat(Object.getOwnPropertyNames(e))) 
// 	else 
// 		Object.fromEntries(
// 			[...new Set(props.concat(Object.getOwnPropertyNames(e)))]
// 			.map(prop => [prop, o[prop]]))
// }

function hide_html_elements (elements) {
	elements.map((elem) => elem.classList.toggle("hidden"));
}



/**
 * 	"Readme" file of selected user
 */
function Doc({doc, ...props}) {

	const [docContent, setDocContent] = useState('');
	const [btnName, setBtnName] = useState('More...');
	const dispatch = useDispatch();

	// Get data from the "Readme" file
	async function get_data (path) {

		let response = await DocService.getDoc(
			doc.full_name + "/contents/" + path
		);

		// dispatch(updateRatelimit());

		if (response)
			response = docFormat(doc, response);
		
		return response || ''

	}

	// Load and show the first "Readme" file from the repository
	async function load_docs () {

		const app = document.getElementById("App");
		const doc_html = document.getElementById(doc.id);
		const doc_loading = doc_html.getElementsByClassName("loading")[0];
		const doc_button = doc_html.getElementsByClassName("button_more")[0];
		const doc_content = doc_html.getElementsByClassName("doc__content")[0];
		
		// Checking if the file has already been requested
		if (doc_html.getAttribute('requested') == null) {

			doc_html.toggleAttribute('requested');
			hide_html_elements([doc_button, doc_loading]);

			const docs = await DocService.get_readme_docs(doc.full_name);
			// dispatch(updateRatelimit());

			if (docs && docs.length) {
				setDocContent(await get_data(docs[0]));
				doc_html.toggleAttribute("content_hide");
				doc_content.toggleAttribute("hidden");
				doc_button.classList.toggle("hidden");
			}
			doc_loading.classList.toggle("hidden");
			
		} else {
			doc_content.toggleAttribute("hidden");
			doc_html.toggleAttribute("content_hide");
		}

		// Scroll page up when content is hidden
		if (app.scrollTop > doc_html.offsetTop) 
			app.scrollTop = doc_html.offsetTop - 16;

		setBtnName((btnName === 'More...') ? 'Less' : 'More...');

	}


	return (
		<div className='doc' id={doc.id}>
			<div className='doc__title'>
				<a target="_blank"
					rel="noopener noreferrer"
					className='doc__name'
					href={doc.html_url}
				>{doc.name}</a>
				<MyLoading inner_class="md" outer_class="loading hidden"/>
				<MyButton outer_class="button_more" 
					onClick={()=>load_docs()}
					>{btnName}</MyButton>
			</div>
			<div className="doc__content markdown-body" hidden>
				<ReactMarkdown children={docContent} 
					remarkPlugins={[remarkGfm]} />
			</div>
		</div>
	)

}

export default Doc
