import React from 'react';
import { useHistory } from 'react-router-dom';
import { dispatch, useGlobalState } from '../store';

const signout = async () => dispatch({ type: 'signout' });

function AuthButton() {
  const history = useHistory();
  const [isAuthenticated] = useGlobalState('isAuthenticated');

  return isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        type="button"
        onClick={() => {
          signout().then(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

export default AuthButton;
