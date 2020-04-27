import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import Counter from './components/Counter';
import { dispatch, useGlobalState } from './store';

const signin = async () => dispatch({ type: 'signin' });
const signout = async () => dispatch({ type: 'signout' });

function App() {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <Counter />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

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

type PrivateRouteProps = {
  children: React.ReactNode;
  path: string;
};

function PrivateRoute({ children, path }: PrivateRouteProps) {
  const [isAuthenticated] = useGlobalState('isAuthenticated');
  return (
    <Route
      path={path}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

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

export default App;
