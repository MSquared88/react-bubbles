import React from "react";

import { useInput } from '../utils/useInput'
import axiosWithAuth from "../utils/axiosWithAuth";
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials, handleChanges] = useInput({
		username: '',
		password: ''
  })
  const handleSubmit = e =>{
    e.preventDefault()
    axiosWithAuth()
    .post('/login',credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      console.log(res)
      props.history.push('/bubbles');
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input 
        name='username'
        type='text'
        onChange={handleChanges}
        value={credentials.username}
        />
        <label>Password:</label>
        <input 
        name='password'
        type='text'
        onChange={handleChanges}
        value={credentials.password}
        />
        <button>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
