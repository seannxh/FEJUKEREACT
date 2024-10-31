import { Link } from 'react-router-dom';

const TrackList = ({ tracks = [], handleDeleteTrack, handlePlayTrack }) => {
  return (
    <div>
      <h4>All Available Tracks!</h4>
      {tracks.map((track, index) => (
        track && track.title ? ( // Check if track is defined and has a title
          <div key={track._id || index}> {/* Fallback to index as key if _id is missing */}
            <h3>{track.title}</h3>
            <p>By: {track.artist}</p>
            <img src={track.coverArtUrl} alt={`${track.title} Cover Art`} />
            <br />
            <audio controls src={track.soundClipUrl}>
              Your browser does not support the audio element.
            </audio>
            <div>
              <button onClick={() => handlePlayTrack(track)}>Play/Stop</button>
              <Link to={`/tracks/${track._id}/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
            </div>
          </div>
        ) : null // If track or title is missing, render nothing
      ))}
    </div>
  );
};

export default TrackList;
