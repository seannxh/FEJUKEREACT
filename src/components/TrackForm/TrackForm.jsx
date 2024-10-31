import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Show } from "../../services/trackService.js";


const TrackForm = (props) => {
  const { trackId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    coverArtUrl: "",
    soundClipUrl: "",
  });

  useEffect(() => {
    if (trackId) {
      const fetchTrack = async () => {
        try {
          const trackData = await Show(trackId);
          setFormData(trackData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchTrack();
    }
  }, [trackId]);

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackId) {
      props.handleUpdateTrack(trackId, formData);
    } else {
      props.handleAddTrack(formData);
    }
  };

    return(
        <main>
            <form onSubmit={handleSubmit}>
            <h1>{trackId ? 'Edit Track' : 'New Track'}</h1>
                <label htmlFor="title-input">Title</label>
                <input 
                    required
                    type="text"
                    name="title"
                    id="title-input"
                    value={formData.title}
                    onChange={handleChange}                    
                />
                <label htmlFor="artist-input">Artist</label>
                <input 
                    required
                    type="text"
                    name="artist"
                    id="artist-input"
                    value={formData.artist} 
                    onChange={handleChange}                    
                />
                <label htmlFor="coverArtUrl-input">Cover Art</label>
                <input 
                    required
                    type="text"
                    name="coverArtUrl"
                    id="coverArtUrl-input"
                    value={formData.coverArtUrl} 
                    onChange={handleChange}                    
                />
                <label htmlFor="soundClipUrl-input">SoundClip</label>
                <input 
                    required
                    type="text"
                    name="soundClipUrl"
                    id="soundClipUrl-input"
                    value={formData.soundClipUrl} 
                    onChange={handleChange}                    
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    )
};

export default TrackForm;
