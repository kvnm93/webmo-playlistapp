import axios from 'axios';

export const getPlaylists = () => {
  return axios
    .get('/playlists/get')
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}

export const getPlaylist = (id) => {
  return axios
    .get('/playlists/get/'+id+"/")
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}

export const followPlaylist = (id) => {
  return axios
    .post('/playlists/follow/'+id+"/", {unfollow: false})
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    })
}

export const unfollowPlaylist = (id) => {
  return axios
    .post('/playlists/follow/'+id+"/", {unfollow: true})
    .then(response => {
      return response;
    })
}

export const getSongs = (term = "") => {
  return axios
    .get('/songs/get/?term='+term)
    .then(response => {
      return response;
    })
}

export const getSong = (id) => {
  return axios
    .get('/songs/get/'+id+"/")
    .then(response => {
      return response;
    })
}