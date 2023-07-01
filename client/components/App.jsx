import React, { useEffect, useState } from 'react';
import LeftDiv from './LeftDiv';
import TopBar from './TopBar';
import PlaylistDiv from './PlaylistDiv.jsx';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  function updatePlaylist(arr) {
    setCurrentPlaylist(arr);
  }
  useEffect(() => {
    async function getUser() {
      const user = await fetch('http://localhost:3000/user/dummyUser1');
      const newUser = await user.json();
      setCurrentUser(newUser);
    }
    getUser();
  }, []);
  const [isUserOpen, setUserOpen] = useState(false);
  const [isPlaylistOpen, setPlaylistOpen] = useState(false);
  return (
    <div>
      {/* pass down playlist array to props */}
      <div
        className="total-div"
        style={{ display: 'flex', flexDirection: 'col', height: '90vh' }}
      >
        <LeftDiv
          isUserOpen={isUserOpen}
          setUserOpen={setUserOpen}
          currentUser={currentUser}
        />

        <div className="main-div">
          <TopBar
            isPlaylistOpen={isPlaylistOpen}
            setPlaylistOpen={setPlaylistOpen}
            updatePlaylist={updatePlaylist}
          />
          {/* render cards here */}
          <PlaylistDiv currentPlaylist={currentPlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;
