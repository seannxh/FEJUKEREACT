import NavBar from "./components/NavBar/NavBar.jsx";
import Home from "./components/Home/Home.jsx";
import {
  index,
  Create,
  deleteTrack,
  update,
} from "./services/trackService.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import TrackForm from "./components/TrackForm/TrackForm.jsx";
import TrackList from "./components/TrackList/TrackList.jsx";
import NowPlaying from "./components/NowPlaying/NowPlaying.jsx";
import TrackDetails from "./components/TrackDetails/TrackDetails.jsx";
import { useState, useEffect } from "react";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const trackData = await index();
        console.log("trackData: ", trackData);
        setTracks(trackData);
      } catch (err) {
        console.log("Error fetching tracks:", err);
      }
    };
    fetchTracks();
  }, []);

  const handleAddTrack = async (trackFormData) => {
    try {
      const newTrack = await Create(trackFormData);
      setTracks([newTrack, ...tracks]);
      navigate("/tracks");
    } catch (err) {
      console.error("Error adding track:", err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      await deleteTrack(trackId);
      setTracks(tracks.filter((track) => track._id !== trackId));
      navigate("/tracks");
    } catch (err) {
      console.error("Error deleting track:", err);
    }
  };

  const handleUpdateTrack = async (trackId, trackFormData) => {
    try {
      const updatedTrack = await update(trackId, trackFormData);
      const updatedTracks = tracks.map((track) =>
        track._id === trackId ? updatedTrack : track
      );
      navigate("/tracks");
    } catch (err) {
      console.error("Error updating track:", err);
    }
  };

  const handlePlayTrack = (track) => {
    setPlaying(track);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home tracks={tracks} />} />
        <Route
          path="/tracks"
          element={
            <TrackList
              tracks={tracks}
              handleDeleteTrack={handleDeleteTrack}
              handlePlayTrack={handlePlayTrack}
            />
          }
        />
        <Route
          path="/tracks/new"
          element={<TrackForm handleAddTrack={handleAddTrack} />}
        />
        <Route path="/tracks/:trackId" element={<TrackDetails />} />
        <Route
          path="/tracks/:trackId/edit"
          element={<TrackForm handleUpdateTrack={handleUpdateTrack} />}
        />
      </Routes>
      {playing && <NowPlaying track={playing} />}
    </>
  );
};

export default App;
