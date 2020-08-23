import React, { useContext } from 'react';
import { FirebaseContext } from '../../Firebase';
import MenuProfile from '../Dropdown';
import './style.scss';

const NavBar = () => {
  const { state: { currentUser } } = useContext(FirebaseContext);


  const renderItems = () => {
    if (currentUser) {
      return (
        <div className='profile-wrapper'>
          <MenuProfile/>
        </div>
      );
    }
  };


  return (
    <>
      <div className='nav-bar'>
        <div className='menu-item'>
          {renderItems()}
        </div>
      </div>
    </>);
};

export default NavBar;
