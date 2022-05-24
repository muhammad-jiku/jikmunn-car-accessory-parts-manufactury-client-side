import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './Pages/Authentication/SignIn/SignIn';
import SignUp from './Pages/Authentication/SignUp/SignUp';
import Blog from './Pages/Blog/Blog';
import CarPartsPurchase from './Pages/CarPartsPurchase/CarPartsPurchase';
import Home from './Pages/Home/Home/Home';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/purchase/:carItemId" element={<CarPartsPurchase />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
