import "../components/Tela.css"
import SessionLogin from "../components/SessionLogin";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Logo from "../components/imagens/quest_logo.png";
import Titulo_q from "../components/Titulo_q";
import Body_q from "../components/Body_q";
import Header_q from "../components/Header_q";

import { useParams } from "react-router-dom";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/AuthContext';


function Quest_D (){

    const { authenticated } = useContext(Context);

    const { id } = useParams();

    const [quest, setQuest] = useState();
    const [loading, setLoading] = useState(true);

    const url = 'https://smdquests.000webhostapp.com/api/quests/'+id;

    useEffect(() =>{
       async function getQuest() { // esse teste possivelmente deu certo
      
          const token = localStorage.getItem('token').replace(/["]/g, '');

          fetch(url, {
            method: 'get'
          }).then(function(response) {
                return response.json();
          }).then(data => {
                setQuest(data)
          }).catch(error => {
                // Lidar com erros
                console.error(error);
          });

        }
        getQuest();
         
    },[]);

    useEffect((e) => {
        if(quest != undefined){
        setLoading(false);
        }
    }, [quest])

    return(
        <div className="background">
            <Header_q/>
            <main>
            {loading ? (<p>Carregando</p>) :
                <>
                <Titulo_q quest={quest}/> 
                <Body_q quest={quest} auth={authenticated}/>
                <Footer /> 
                 </>
            }
            </main>
           
        </div>
    )
}

export default Quest_D