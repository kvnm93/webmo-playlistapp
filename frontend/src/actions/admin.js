import axios from 'axios';

export const deleteSong = (id) => {
  return axios
    .delete('/songs/delete/'+id+"/")
    .then(response => {
      return response;
    })
};

export const updateSong = (id, values) => {
  return axios
    .put('/songs/update/'+id+"/", values)
    .then(response => {
      return response;
    })
}

export const createSong = (values) => {
  return axios
    .post('/songs/add', values)
    .then(response => {
      return response;
    })
}

export const deletePlaylist = (id) => {
  return axios
    .delete('/playlists/delete/'+id+"/")
    .then(response => {
      return response;
    })
};


export const updatePlaylist = (id, values) => {
  return axios
    .put('/playlists/update/'+id+"/", values)
    .then(response => {
      return response;
    })
}

export const createPlaylist = (values) => {
  console.log(values);
  return axios
    .post('/playlists/add', values)
    .then(response => {
      return response;
    })
}