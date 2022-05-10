import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import {Navbar, Homepage, Cryptocurrencies, CryptoDetails, Exchanges, News} from './components';
import './App.scss'

const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <main className='main'>
          <div className='routes'>
              <Routes>
                <Route exact path='/' element={<Homepage />}/> 
                <Route exact path='/cryptocurrencies' element={<Cryptocurrencies />}/> 
                <Route exact path='/crypto/:coinId' element={<CryptoDetails />}/> 
                <Route exact path='/exchanges' element={<Exchanges />}/> 
                <Route exact path='/news' element={<News />}/> 
              </Routes>
          </div>
        </main>
        <footer className='footer'>
        <p> <b>cryptostracker</b></p>
        <p>All right reserved </p>
        </footer>
    </div>
  )
}

export default App