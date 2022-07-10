import "../styles/Docs.css"

import React from 'react'
import Doc from "./Doc"

function Docs() {
  return (
    <div className="docs">
      <h3 style={{display: 'flex', justifyContent: 'center'}}>Доки:</h3>
      <Doc />
    </div>
  )
}

export default Docs