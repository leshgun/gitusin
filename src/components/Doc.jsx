import React from 'react'

function Doc(props) {
  return (
    <div className='doc'>
      <div className='doc__title'>
        <h4>{props.doc.title}</h4>
      </div>
      <div className='doc__content'>
        <div>{props.doc.content}</div>
      </div>
    </div>
  )
}

export default Doc