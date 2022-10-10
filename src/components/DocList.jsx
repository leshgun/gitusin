// import React, { useState } from 'react'
import Doc from "./Doc"
import MyLoading from "../UI/loading/MyLoading";

import mprint from "../utils/myPrint";
import "../styles/DocList.css"



function Docs({docs=[], error}) {

	const loading = <MyLoading />;
	const defError = <h2>Loh...</h2>;

	let children;
	if (docs.length) children = docs.map(doc => <Doc doc={doc} key={doc.id} />);
	else children = error || loading || defError;

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