import axios, { AxiosRequestConfig } from 'axios';
import UserDTO from "../models/UserDTO";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { verify } from 'jsonwebtoken';


const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});

//44384 - Pc Sena
//44336 - Pc Felipe
//44323 - Pc Vitim

export async function LoginByEmailAndPassword(email: string, password: string){
    await api.post('/Login', {email: email, password: password})
    .then((response) => {
        localStorage.setItem('LoginToken', response.data[0]);
        localStorage.setItem('LoginUserId', response.data[1]);
    })
    .catch((error) => {console.log(error);});
}


// Verifica se possui um Token no LocalStorage e se o token do localStorage é igual ao token quando realizado o login

export async function theTrueOrFalseLogin(){

    let localgetToken = localStorage.getItem('LoginToken');

    const config: AxiosRequestConfig = {
        headers: {
          'Authorization': `Bearer ${localgetToken}`
        }
    }

    if(!localgetToken) return false;
    try{
        await api.get('/Login/VerifyToken', config)
        return true;
    }
    catch(err){
        return false;
    }
    

    /*
    .then((response) => {return true;})
    .catch((error) => {return false;})
    */
}

  