import React from 'react'

const STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px',
    backgroundColor: '#FFF',
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}
export default function CreateUserPopup ({open, children, onClose}) {

    if(!open) return null

return(
    <>
        <div style={OVERLAY_STYLE}>
        <div style={STYLE}>
            <button onClick={onClose}>Close Model</button>
            {children}
        </div>
        </div>
    </>
)}