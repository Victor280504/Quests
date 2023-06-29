import axios from 'axios';
const url = "http://localhost/api/login";
import {useFetch} from "../hooks/useFetch";

const Context = createContext();

import { useNavigate} from "react-router-dom";

import React, { createContext, useState, useEffect } from 'react';

const urlUser = 'https://smdquests.000webhostapp.com/api/user/auth';

function AuthProvider({ children }){



	//const { data:temas} = useFetch(url);	

	const [authenticated, setAuthenticated] = useState(false);
	const [login, setLogin] = useState();
  	const [password, setPassword] = useState();
  	const [loading, setLoading] = useState(true);
	const [user , setUser] = useState(null);
  	const navigate = useNavigate();

  	useEffect(() =>{
  		const token = localStorage.getItem('token');
 
  		if(token && token != 'undefined' && token != undefined){
  			axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
  			setAuthenticated(true);
  			handleUser();
  		}

  		setLoading(false);
  	},[]);


  	async function handleUser() { // esse teste possivelmente deu certo
	  
	  const token = localStorage.getItem('token').replace(/["]/g, '');

	  fetch('https://smdquests.000webhostapp.com/api/user/auth', {
	    method: 'post',
	    body: JSON.stringify({
		    token
		})
	  }).then(function(response) {
		    return response.json();
	  }).then(data => {
	  		setUser(data);
  	  }).catch(error => {
		    // Lidar com erros
		    console.error(error);
	  });

	}

  	async function handleLogin(e) { // esse teste possivelmente deu certo
	  e.preventDefault();
	  fetch('https://smdquests.000webhostapp.com/api/login', {
	    method: 'post',
	    body: JSON.stringify({
		    login,
		    password
		})
	  }).then(function(response) {
		    return response.json();
	  }).then(data => {
		    const token = data;
			localStorage.setItem('token', JSON.stringify(token));
			axios.defaults.headers.common['Authorization'] = token;
			setAuthenticated(true);
			//getUser();
			navigate('/home/'+token);
			//console.log(token);
  	  }).catch(error => {
		    // Lidar com erros
		    console.error(error);
	  });

	}

	function handleLogout(e){
		e.preventDefault();
		localStorage.removeItem('token');
		axios.defaults.headers.common['Authorization'] = undefined;
		setAuthenticated(false);
		navigate('/');
	}

	if (loading) {
		return <h1>loading.....</h1>;
	}





	return(
		<Context.Provider value={{ authenticated, handleLogin, setLogin, setPassword, handleLogout, setAuthenticated}}>
			{children}
		</Context.Provider>
		);
}

export { Context, AuthProvider };