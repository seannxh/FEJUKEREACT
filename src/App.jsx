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
        console.log('trackData: ', trackData);
        setTracks(trackData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleAddTrack = async (trackFormData) => {
    const newTrack = await Create(trackFormData);
    setTracks([newTrack, ...tracks]);
    console.log(trackFormData);
    navigate("/tracks");
  };

  const handleDeleteTrack = async (trackId) => {
    console.log("TrackId:", trackId);
    await deleteTrack(trackId);
    setTracks(
      tracks.filter((track) => {
        return track._id !== trackId;
      })
    );
    navigate("/tracks");
  };

  const handleUpdateTrack = async (trackId, trackFormData) => {
    const updatedTrack = await update(trackId, trackFormData);
    const updatedTracks = tracks.map(track => 
      track._id === trackId ? updatedTrack : track
    );
    setTracks(updatedTracks);
    navigate(`/tracks`);
  };

  const handlePlayTrack = (track) => {
    if (playing && playing._id === track._id) {
      setPlaying(null);
    } else {
      setPlaying(track);
    }
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home playing={playing} tracks={tracks}/>} />
        <Route path='/tracks' element={
              <TrackList  tracks={tracks}  
                          handleDeleteTrack={handleDeleteTrack}
                          handlePlayTrack={handlePlayTrack} />} />
        <Route path='/tracks/new' element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path='/tracks/:trackId' element={<TrackDetails/>} />
        <Route path='/tracks/:trackId/edit' element={<TrackForm handleUpdateTrack={handleUpdateTrack}/>} />
      </Routes>
      {playing && <NowPlaying track={playing} />} 
    </>
  );
}



export default App;
