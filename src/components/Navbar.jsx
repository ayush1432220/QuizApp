import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-logo" onClick={closeMenu}>
        QuizMaster
      </NavLink>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>
      <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        <li><NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/quiz" className="nav-link" onClick={closeMenu}>Start Quiz</NavLink></li>
        <li><NavLink to="/leaderboard" className="nav-link" onClick={closeMenu}>Leaderboard</NavLink></li>
        <li><NavLink to="/about" className="nav-link" onClick={closeMenu}>About</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;