import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import  SignUpModal  from './modals/SignUpModal';
//import './App.css'
//import Modal from 'react'
//import CustomModal from '../modals/CustomModal';
import SignUpModal from '../modals/SignUpModal';


const NavBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal =() => setIsModalOpen(false);

  return (
    <>
      <nav className="NavBar">
        <div className="NavBar-left">
          <div className="logo-container">
            <span className="logo-text">logo</span>
          </div>
          <h1 className="NavBar-title">ProjectManager Pro</h1>
        </div>
        <button className="signup-button" onClick={openModal}>Sign up</button>
      </nav>
      <SignUpModal isOpen={isModalOpen} onClose={closeModal}/>
    </>
  );
};

export default NavBar;