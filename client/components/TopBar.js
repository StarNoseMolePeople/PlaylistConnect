import React from 'react'
import CreatPlaylistPopup from './CreatPlaylistPopup'

export default function TopBar({isPlaylistOpen, setPlaylistOpen}) {
  return (
    <div className='div-round top-bar'>
        <h1>Topbar</h1>
        <button className='div-round' onClick={() => setPlaylistOpen(true)}>Create Playlist</button>
        <CreatPlaylistPopup open={isPlaylistOpen} onClose = {() => setPlaylistOpen(false)}>
            test Playlist Popup
        </CreatPlaylistPopup>
    </div>
    
  )
}
