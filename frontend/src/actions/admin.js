import axios from 'axios';


export const deleteSong = (id) => {
  return axios
    .delete('/songs/'+id+"/")
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
};

export const updateSong = (id, values) => {
  return axios
    .put('/songs/'+id+"/", values)
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}