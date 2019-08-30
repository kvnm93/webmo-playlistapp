import React from 'react';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Songs from "./pages/Songs";
import RoutePlaylists from "./pages/RoutePlaylists";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import i18n from './i18n/i18n';

/*
        <div style={{position: "fixed", zIndex: "-99", width: "100%", height: "100%"}}>
            <iframe frameBorder="0" height="100%" width="100%"
                    src="https://www.youtube.com/embed/ZFd7jVc7x2g?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1">
            </iframe>
        </div>
 */

const App = () => (
  <Router>
    <div className="App">

        <div className="container">
          <I18nextProvider i18n={i18n}>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/songs" component={Songs} />
            <Route path="/playlists" component={RoutePlaylists} />
          </I18nextProvider>
      </div>
    </div>
  </Router>
);

export default App;
