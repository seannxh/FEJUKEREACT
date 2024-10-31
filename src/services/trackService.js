const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    } catch (err) {
        console.log(err)
    }
}

const Show = async (trackId) => {
    try{
        const res = await fetch(`${BASE_URL}/${trackId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        return res.json();
    }catch(err){
        console.log(err)
    }
}

 const Create = async (trackFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(trackFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        return res.json();
    } catch (error) {
        console.log(error)
    }
}
const CreateTrack = async (trackId, trackFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${trackId}/comments`, {
            method: 'POST',
            body: JSON.stringify(trackFormData),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(res)
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

const deleteTrack = async (trackId) => {
    try {
      const res = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

const update = async (trackId, trackFormData)=> {
    try{
        const res = await fetch(`${BASE_URL}/${trackId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackFormData)
        })
    }catch(err) {
        console.log(err)
    }
}
export { index, Show, Create, CreateTrack , deleteTrack, update }

