import "../styles/Header.css"

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

function Header() {
  return (
    <header>
      <div className="home">
        <FontAwesomeIcon icon={solid('house-chimney') } size="xl" />
      </div>
      <div className="user-name_input">
        <h5>User:</h5>
        <input placeholder="leshgun" title="Choose user to get info about" />
      </div>
    </header>
  )
}

export default Header