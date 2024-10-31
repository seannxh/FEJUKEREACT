// NowPlaying.jsx
import React from 'react';

const NowPlaying = ({ track }) => {
  if (!track) return null; // Only render if a track is provided

  return (
    <div className="now-playing">
      <h3>Now Playing:</h3>
      <p>{track.title} by {track.artist}</p>
      <img src={track.coverArtUrl} alt={`${track.title} cover art`} />
    </div>
  );
};

export default NowPlaying;
