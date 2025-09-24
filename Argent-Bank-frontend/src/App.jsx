import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';
import Footer from './components/footer';
import Login from './pages/Login';
import User from './pages/User';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;