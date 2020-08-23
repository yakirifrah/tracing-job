import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { FirebaseContext } from '../../../Firebase';

const Profile = ({ size }) => {
  const { state: { currentUser } } = useContext(FirebaseContext);
  console.log(currentUser.photoURL);
  return (
    <>
      {currentUser.photoURL ? (
        <Avatar src={currentUser.photoURL} size={size}/>
      ) : (
        <Avatar size={size}>{currentUser.providerData[0].displayName}</Avatar>
      )}
    </>
  );
};


export default Profile;
