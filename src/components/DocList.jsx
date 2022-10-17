import React, { useState, useEffect, useContext } from 'react'

import Doc from "./Doc"
import { MyContext } from '../App';

import DocService from '../API/DocService';
import MyLoading from "../UI/loading/MyLoading";
import MyError from '../UI/error/MyError';

import "../styles/DocList.css"

function Docs({user}) {

	const [docs, setDocs] = useState([]);
	const [requestError, setRequestError] = useState(false);

	const {defError} = useContext(MyContext);

	const loading = <MyLoading />;

	useEffect(() => {
		async function fetchDocs(user) {
			setDocs([]);
			setRequestError(false);
			const response = await DocService.getDocList(user);
			if (response.data) {
				if (response.data.length) setDocs(response.data);
				setRequestError(<h5>There is no public repos...</h5>)
			}
			else {
				setRequestError(
					<MyError response={response} />
				);
			}
		}
		fetchDocs(user);
	}, [user])

	let children;
	if (docs.length) children = docs.map(doc => <Doc doc={doc} key={doc.id} />);
	else children = requestError || loading || defError;

	return (
		<div className="docs">
			<h3 style={{display: 'flex', justifyContent: 'center'}}>
				Репозитории пользователя:
			</h3>
			{children}
		</div>
	)
}

export default Docs