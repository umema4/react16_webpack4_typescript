import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { dispatch } from '../store';

const signin = async () => dispatch({ type: 'signin' });

function LoginPage() {
  const history = useHistory();
  const location = useLocation();

  const { from } = (location.state as any) || {
    from: { pathname: '/' },
  };
  const login = () => {
    signin().then(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button type="button" onClick={login}>
        Log in
      </button>
    </div>
  );
}

export default LoginPage;
