import React from 'react'

import cl from './MyLoading.module.css'

function MyLoading({size='lg'}) {
  // console.log(size)
  // console.log([cl["lds-hourglass"], cl[size]].join(' '))
  return (
	  <div className={[cl["lds-hourglass"], cl[size]].join(' ')}></div>
  )
}

export default MyLoading