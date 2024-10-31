import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { index, Show, Create, CreateTrack, deleteTrack, update } from "../../services/trackService.js";

const TrackDetails = () => {
    const { trackId } = useParams();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchTrack = async () => {
            try{
                const trackData = await Show(trackId);
                console.log('TrackData:', trackData)
                setTracks(trackData)
            }catch(err){
                console.log("Error:", err)
            }
        }
        fetchTrack();
    },[trackId])


return(
    <main>
            <header>
                {tracks ? (
                    <>
                        <h2>Title: {tracks.title}</h2>
                        <h3>Artist: {tracks.artist}</h3>
                    </>
                ) : (
                    <p>Loading Disc...</p>
                )}
            </header>
        </main>
    );
};
export default TrackDetails