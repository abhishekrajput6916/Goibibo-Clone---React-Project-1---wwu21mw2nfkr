import { useContext } from 'react'
import React from 'react'
import { LoginContext } from '../Contexts/contexts'
import { ModalContext } from '../Contexts/contexts';

function Logout() {
  const {isLoggedIn,setIsLoggedIn} =useContext(LoginContext);  
  const {showModal,setShowModal} =useContext(ModalContext);  
  function handleLogout(){
    sessionStorage.clear();
    setIsLoggedIn(false);
    setShowModal(false);


    // sessionStorage.setItem("loggedInUser", JSON.stringify(user))
  }
  return (
    <div id='logout'>
        <h1 className='logout-page-title'>Logout</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout