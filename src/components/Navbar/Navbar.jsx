import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, CloseSquareOutlined, InfoCircleOutlined } from '@ant-design/icons';

import './Navbar.scss';
import logo from '../../images/logo.png'

const Navbar = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt="logo" />
          </div>
        </Link>
      </div>

      <div className="menu-desktop">
        <Link to='/' className='menu-item'>Home</Link>
        <Link to='/cryptocurrencies' className='menu-item'>Cryptocurrencies</Link>
        <Link to='/exchanges' className='menu-item'>Exchanges</Link>
        <Link to='/news' className='menu-item'>News</Link>
        <Link to='#' className='menu-item menu-item-info'><InfoCircleOutlined /></Link>
      </div>

      <MenuOutlined onClick={() => setToggle(true)} className="menu-mobile-open" />
      {toggle && (
        <div className='menu-mobile'>
          <div className="menu-mobile-close">
          <CloseSquareOutlined onClick={() => setToggle(false)} className="menu-mobile-close-icon"/>
          </div>
          <div className='menu'>
            <Link to='/' className='menu-item' onClick={() => setToggle(false)}>Home</Link>
            <Link to='/cryptocurrencies' className='menu-item' onClick={() => setToggle(false)}>Cryptocurrencies</Link>
            <Link to='/exchanges' className='menu-item' onClick={() => setToggle(false)}>Exchanges</Link>
            <Link to='/news' className='menu-item' onClick={() => setToggle(false)}>News</Link>
            <Link to='#' className='menu-item menu-item-info' onClick={() => setToggle(false)}><InfoCircleOutlined /></Link>
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar