import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='container-fluid navbar-container'>
   <nav className='navbar navbar-expand-lg '>
    <Link to={'/'} className='navbar-brand text-white font-weight-bold d-none d-md-block  '>Employee Management System</Link>
    <Link to={'/'} className='navbar-brand text-white font-weight-bold d-block d-md-none'>EMS</Link>
   </nav>
    </div>
  )
}

export default Navbar;