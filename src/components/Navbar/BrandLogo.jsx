import React from 'react'
import './Navbar.css'

import logo from '../../images/Goibibo_logo.png'
import { NavLink } from 'react-router-dom'

function BrandLogo() {
  return (
    <NavLink to="/" id="brand-logo"><img src={logo} /></NavLink>
  )
}

export default BrandLogo