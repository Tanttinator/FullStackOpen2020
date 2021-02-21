import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification.shown) {
    return (
      <div style={style}>
        {notification.msg}
      </div>
    )
  }
  return (<div></div>)
}

export default Notification