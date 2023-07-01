import React, { useEffect, useState } from 'react';
import PlaylistDiv from './PlaylistDiv.jsx';
const App = () => {
  return (
    <div>
      {/* pass down playlist array to props */}
      <PlaylistDiv />
    </div>
  );
};

export default App;
