import React, { useEffect } from 'react'
import { useContext } from 'react';
import { LoginContext, ModalContext, useAuth, useModal } from '../Contexts/contexts';
import { Navigate, useNavigate } from 'react-router-dom';

function AuthNavigator({children}) {
    const {isLoggedIn}=useAuth();
    const {setShowModal}=useModal();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isLoggedIn){
            setShowModal(true);
        }else{
            console.log(children);
        }
        return ()=>{navigate('/')}
    },[])
    return isLoggedIn && children;
}

export default AuthNavigator