import React, { useEffect, useState } from 'react';

const MyIframe = () => {
  return (
    <div>
      <iframe
        src="https://open.spotify.com/embed/playlist/3izNnfu8IxFMgADnN6KHG5?utm_source=generator"
        width={30 + '%'}
        height={500 + 'px'}
        border-radius={0 + 'px'}
        border-width={0 + 'px'}
        border-style={'none'}
      ></iframe>
    </div>
  );
};
export default MyIframe;
