import React, { useEffect } from 'react'
import { useContext } from 'react';
import { LoginContext, ModalContext } from '../Contexts/contexts';
import { Navigate, useNavigate } from 'react-router-dom';

function AuthNavigator({children}) {
    const {isLoggedIn}=useContext(LoginContext);
    const {setShowModal}=useContext(ModalContext);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            setShowModal(true);
        }else{
            console.log(children);
        }
    },[])
    return isLoggedIn && children;
}

export default AuthNavigator