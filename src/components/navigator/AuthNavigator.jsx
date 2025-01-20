import React, { useEffect } from 'react'
import {useAuth, useModal } from '../Contexts/contexts';
import {useNavigate } from 'react-router-dom';

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