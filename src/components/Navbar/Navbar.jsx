import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className='container-fluid navbar-container'>
   <nav className='navbar navbar-expand-lg '>
    <Link to={'/'} className='navbar-brand text-white font-weight-bold'>Employee Management System</Link>
   </nav>
    </div>
  )
}

export default Navbar;