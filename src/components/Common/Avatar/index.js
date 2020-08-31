import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase';
import { showName } from '../../../helpers';

const Profile = ({ size }) => {
  const { state: { currentUser } } = useContext(FirebaseContext);
  return (
    <>
      {currentUser.photoURL ? (
        <Avatar src={currentUser.photoURL} size={size}/>
      ) : (
        <Avatar size={size}>{showName(currentUser.providerData[0].displayName)}</Avatar>
      )}
    </>
  );
};


export default Profile;
