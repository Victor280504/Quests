import axios from 'axios';
const url = "http://localhost/api/login";
import {useFetch} from "../hooks/useFetch";

const Context = createContext();

import { useNavigate} from "react-router-dom";

import React, { createContext, useState, useEffect } from 'react';

const urlUser = 'https://smdquests.000webhostapp.com/api/auth/user';

function AuthProvider({ children }){



	//const { data:temas} = useFetch(url);	

	const [authenticated, setAuthenticated] = useState(false);
	const [login, setLogin] = useState();
  	const [password, setPassword] = useState();
  	const [loading, setLoading] = useState(true);
	const [user , setUSer] = useState(null);
  	const navigate = useNavigate();

  	useEffect(() =>{
  		const token = localStorage.getItem('token');
 
  		if(token && token != 'undefined' && token != undefined){
  			axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
  			setAuthenticated(true);
  		}

  		setLoading(false);
  	},[]);


	// async function handleLogin(e){   //função com axios -- não funciona no 000webhost
	// 	e.preventDefault();
	// 	let token;
	// 	const response = await axios.post(url, {
	//         login, 
	//         password, 
	//     }).then(function (response) {
	//     	if(response.data){
	//     		token = response.data;
	//        		localStorage.setItem('token', JSON.stringify(token));
	// 			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	// 			setAuthenticated(true);
	// 			navigate('/home/'+token);
	//     	}
	       	
	//       }).catch(function (error) {

	//         console.log(error);

	//       });
	// }

	if(authenticated){
		useEffect(() =>{

            const token = localStorage.getItem('token');
             const teste = async () => {
                 const response = await axios.get(urlUser, {
                }).then(function (response) {
                if(response.data){
                    console.log(response.data)
                };
                }).catch(function (error) {

                  console.log(error);

                });
             }
             teste();
      },[]);
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
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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