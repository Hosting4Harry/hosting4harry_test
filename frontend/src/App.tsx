import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login/index';
import Protected from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/protected" component={Protected} />
      <Redirect from="/" to="/login" />
    </Router>
  );
};

export default App;
