import React from 'react';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import i18n from './i18n/i18n';

const App = () => (
  <Router>
    <div className="App">
      <div className="container">
          <I18nextProvider i18n={i18n}>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
          </I18nextProvider>
      </div>
    </div>
  </Router>
);

export default App;
