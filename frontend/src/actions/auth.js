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
      return response;
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
}