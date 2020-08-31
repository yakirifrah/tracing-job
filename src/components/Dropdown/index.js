import React, { useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import Profile from '../Common/Avatar';
import { app, FirebaseContext } from '../../Firebase';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';

import './style.scss';

const MenuProfile = () => {
  const history = useHistory();

  const { state: { currentUser } } = useContext(FirebaseContext);
  const { providerData } = currentUser;
  const profileName = providerData[0].displayName;


  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <div className='profile-item'>
          <Profile size={40}/>
          <span className='name'><span className='name__before'>Welcome</span> {profileName}</span>
        </div>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key='1'>
        <div>
          <span className='logout-item' onClick={() => {
            app.auth().signOut().then(() => history.push('/'));
          }}>Log out</span>
        </div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
    >
      <a className="ant-dropdown-link" href={'/'} onClick={e => e.preventDefault()}>
        <Profile/>
      </a>
    </Dropdown>
  );
};

export default withRouter(MenuProfile);
