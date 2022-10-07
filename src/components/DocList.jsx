import "../styles/DocList.css"

// import React, { useState } from 'react'
import Doc from "./Doc"

function Docs({docs}) {

	return (
		<div className="docs">
			<h3 style={{display: 'flex', justifyContent: 'center'}}>Доки:</h3>
			{docs.map(doc => <Doc doc={doc} key={doc.id} />)}
		</div>
	)
}

export default Docs