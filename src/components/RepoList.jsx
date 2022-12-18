import React, { useState, useEffect, useContext } from 'react'

import Doc from "./Doc"
import { MyContext } from '../App';

import DocService from '../API/DocService';
import MyLoading from "../UI/loading/MyLoading";
import MyError from '../UI/error/MyError';

import "../styles/DocList.css"



/**
 * 	List of the public repositories of the target user
 */
function RepoList({user}) {

	const [docs, setDocs] = useState([]);
	const [requestError, setRequestError] = useState(false);
	const {update_ratelimit, default_error} = useContext(MyContext);
	const loading = <MyLoading />;
	let children;

	// Refresh list when user changes
	useEffect(() => {
		async function fetch_docs (username) {
			// Clear old data and fetch new
			setDocs([]);
			setRequestError(false);
			const response = await DocService.get_repos(username);
		
			// Update the counter of possible remaining requests
			update_ratelimit();
		
			if (response.data) {
				if (response.data.length) setDocs(response.data);
				setRequestError(<h5>There is no public repos...</h5>);
			}
			else
				setRequestError(<MyError response={response} />);
		}
		fetch_docs(user)
	}, [user]);


	if (docs.length) 
		children = docs.map(doc => <Doc doc={doc} key={doc.id} />);
	else 
		children = requestError || loading || default_error;


	return (
		<div className="docs">
			<h3 className='text_center'>
				Репозитории пользователя:
			</h3>
			{ children }
		</div>
	)
}

export default RepoList
