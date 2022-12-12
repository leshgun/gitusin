import React from 'react'

import cl from './MyLoading.module.css'

function MyLoading({inner_class='', outer_class=''}) {
  let classes = [];
  classes = classes.concat(outer_class.split(' '));
  classes = classes.concat(inner_class.split(' ').map(x => cl[x] || ''));
  classes.push(cl["lds-hourglass"]);
  return (
	  <div className={classes.join(' ')}></div>
  )
}

export default MyLoading
