import React from 'react'
import './LoggedButton.css';

export default function LoggedButton({userImg, setMenu, menu}) {
  return (
    <button
        type="button"
        onClick={() => setMenu(!menu)}
        style={{backgroundImage:`url(${(userImg??userImg) /*? userImg : "https://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png"*/})`, backgroundSize:"cover", backgroundPosition:"center"}}
        className="user-btn mx-1"
    >              
    </button>
  )
}
