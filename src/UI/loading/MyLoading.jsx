import React from 'react'

import cl from './MyLoading.module.css'

function MyLoading() {
  return (
	<div className={cl["lds-hourglass"]}></div>
  )
}

export default MyLoading