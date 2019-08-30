import axios from 'axios';

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      password: newUser.password,
      user_roles: parseInt(newUser.user_roles)
    })
    .then(response => {
      console.log('Registered')
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      username: user.username,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
        console.log("setting token to " + response.data)
      return response.data
    })
    .catch(err => {
      console.log(err);
      return false;
    })
}