import React, { useState, useContext } from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MyContext } from '../App';
import DocService from '../API/DocService';
import MyButton from '../UI/button/MyButton';
import MyLoading from '../UI/loading/MyLoading';
import docFormat from '../utils/docFormat';
import mprint from '../utils/myPrint';


function get_all_properties(o, e = o, props = []) {
	if (e.__proto__) 
		get_all_properties(o, e.__proto__, 
			props.concat(Object.getOwnPropertyNames(e))) 
	else 
		Object.fromEntries(
			[...new Set(props.concat(Object.getOwnPropertyNames(e)))]
			.map(prop => [prop, o[prop]]))
}


function Doc({doc, ...props}) {

	const [docContent, setDocContent] = useState('');
	const [btnName, setBtnName] = useState('More...');
	const {setRate} = useContext(MyContext)

	async function getData(path) {
		let response = await DocService.getDoc(
			doc.full_name + "/contents/" + path
		);
		if (response) {
			response = docFormat(doc, response);
			if (response) setDocContent(response);
		}
		setRate(localStorage.getItem('OctoRate') || '')
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
		setRate(localStorage.getItem('OctoRate') || '')
		return response
	}

	async function getContentFromDoc() {
		const app = document.getElementById("App");
		const doc_html = document.getElementById(doc.id);
		const doc_loading = doc_html.getElementsByClassName("loading")[0];
		const doc_button = doc_html.getElementsByClassName("button_more")[0];
		const doc_content = doc_html.getElementsByClassName("doc__content")[0];
		
		if (doc_html.getAttribute('requested') == null) {
			doc_html.toggleAttribute('requested');
			doc_loading.classList.toggle("hidden");
			doc_button.classList.toggle("hidden");
			const docs = await findDocs();
			if (docs && docs.length) {
				await getData(docs[0]);
				doc_button.classList.toggle("hidden");
				doc_html.toggleAttribute("content_hide");
				doc_content.toggleAttribute("hidden");
			}
			doc_loading.classList.toggle("hidden");
		} else {
			doc_content.toggleAttribute("hidden");
			doc_html.toggleAttribute("content_hide");
		}

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
					onClick={()=>getContentFromDoc()}
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
