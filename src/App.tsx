import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Counter from './components/Counter';
import LoginPage from './components/LoginPage';
import AuthButton from './components/AuthButton';
import { useGlobalState } from './store';

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

export default App;
