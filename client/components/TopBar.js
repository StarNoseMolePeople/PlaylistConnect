import React from 'react';
import CreatPlaylistPopup from './CreatPlaylistPopup';

export default function TopBar({
  isPlaylistOpen,
  setPlaylistOpen,
  updatePlaylist,
}) {
  function click() {
    setPlaylistOpen(true);
    const temp = {
      playlistName: 'queen lana',
      description: 'queen lana',
      genre: 'testing',
      playlistID: '3izNnfu8IxFMgADnN6KHG5',
      playlistURL:
        'https://open.spotify.com/playlist/3izNnfu8IxFMgADnN6KHG5?si=07936cd96c004359',
      groupID: 1,
      playlistOwner: 'Jason',
    };
    // fetch('http://localhost:3000/playlist', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(temp),
    // })
      // .then((res) => {
      //   return res.json();
      // })
      // .then((res) => updatePlaylist(res));
  }
  return (
    <div className="div-round top-bar">
      <h1>Topbar</h1>
      <button className="div-round" onClick={() => click()}>
        Create Playlist
      </button>
      <CreatPlaylistPopup
        open={isPlaylistOpen}
        onClose={() => setPlaylistOpen(false)}
      >
        test Playlist Popup
      </CreatPlaylistPopup>
    </div>
  );
}
