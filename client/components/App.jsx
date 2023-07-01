import React, { useEffect, useState } from 'react';
import LeftDiv from './LeftDiv';
import TopBar from './TopBar';

const App = () => {
  const [isUserOpen, setUserOpen] = useState(false)
  const [isPlaylistOpen, setPlaylistOpen] = useState(false)
  return (
    <div className = 'total-div'style={{display: 'flex', flexDirection:'col', height: '90vh'}}>
      <LeftDiv isUserOpen={isUserOpen} setUserOpen={setUserOpen}/>
      
      <div className='main-div'>
          <TopBar isPlaylistOpen={isPlaylistOpen} setPlaylistOpen={setPlaylistOpen}/>
          {/* render cards here */}
          <div className='div-round playlist-div'>Playlst div</div>
      </div>
    </div>
  );
};

export default App;
