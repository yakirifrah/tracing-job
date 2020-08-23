import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router';
import SignInButtonSocial from '../../components/Signin';
import Login from '../../components/Login';
import { FirebaseContext } from '../../Firebase';
import './style.scss';
import Loader from '../../components/Common/Loader';

const Home = () => {
  const { state: { currentUser, loading } } = useContext(FirebaseContext);

  if (currentUser) {
    return <Redirect to="/Main"/>;
  }
  return (
    <>
      {loading ? (<Loader/>) : (
        <div className="container">
          <div className="login-social">
            <Login/>
            <SignInButtonSocial/>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(Home);
