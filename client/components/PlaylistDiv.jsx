import React, { useEffect, useState } from 'react';
import Card from './cardPlaylist.jsx';

const PlaylistDiv = (props) => {
  const [allPlayList, setAllPlayList] = useState([]);
  useEffect(() => {
    const dummyGroupPlaylist = [
      {
        playlistName: 'queen lana',
        description: 'queen lana',
        genre: 'testing',
        playlistID: '3izNnfu8IxFMgADnN6KHG5',
        playlistURL:
          'https://open.spotify.com/playlist/3izNnfu8IxFMgADnN6KHG5?si=07936cd96c004359',
        groupID: '1',
        playlistOwner: 'Jason',
      },
      {
        playlistName: 'testing',
        description: 'my fav j-pop tracks rn',
        genre: 'pop',
        playlistID: '4ABpwdNS8snQUJkPfRRLJE',
        playlistURL:
          'https://open.spotify.com/playlist/4ABpwdNS8snQUJkPfRRLJE?si=4b2adb2876884abb',
        groupID: '1',
        playlistOwner: 'Jason',
      },
      {
        playlistName: 'Bezzy Vibing',
        description: 'Bezzy chillin',
        genre: 'Jazz',
        playlistID: '3gBwgPNiEUHacWPS4BD2w8',
        playlistURL: 'https://open.spotify.com/playlist/3gBwgPNiEUHacWPS4BD2w8',
        groupID: '1',
        playlistOwner: 'Bezzy',
      },
    ];
    generateAllPlaylist(props.currentPlaylist);
  }, [props.currentPlaylist]);
  function generateAllPlaylist(arr) {
    const playlists = arr?.map((obj) => (
      <Card playlist={obj} key={obj.playlistID} />
    ));
    setAllPlayList(playlists);
    //console.log(allPlayList);
  }

  return <div className="allplaylist-div div-round">{allPlayList}</div>;
};

export default PlaylistDiv;
