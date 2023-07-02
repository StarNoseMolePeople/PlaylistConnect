import React, { useEffect, useState } from 'react';

const Card = (props) => {
  const { playlistID, playlistOwner, description, genre } = props.playlist;
  return (
    <div className="playlist div-round">
      <div>
        <h2>
          <span>user:</span>
          {playlistOwner}
        </h2>
        <p>
          <span>genre:</span>
          {genre}
        </p>
      </div>

      <p>
        <span>description:</span>
        {description}
      </p>
      <iframe
        src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
        width={100 + '%'}
        height={500 + 'px'}
        border-radius={0 + 'px'}
        border-width={0 + 'px'}
        border-style={'none'}
      ></iframe>
    </div>
  );
};

export default Card;
