import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Form/Home.js';
import Login from './Form/Login.js';
import Register from './Form/Register.js';
import About from './Form/About.js';
import Tour from './Form/Tour.js';
import TourBySearch from './Form/TourBySearch.js';
import Book from './Form/Book.js';
import TakeCash from './Form/TakeCash.js';
import Cart from './Form/Cart.js';
import TourAdmin from './AdminForm/TourAdmin.js';
import { useState, useEffect, Navigate } from 'react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/About' element={<About />} />
          <Route path='/Tours' element={<Tour />} />
          <Route path='/TakeCash' element={<TakeCash />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/TourAdmin' element={<TourAdmin />} />
          <Route path={'/Tours/*'} element={<Book />} />
          <Route path={'/Tours/ToursBySearch/*'} element={<TourBySearch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
