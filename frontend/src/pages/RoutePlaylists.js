import React from 'react';
import {Col, Row} from "antd";
import { Switch, Route } from 'react-router';
import Playlists from './Playlists';
import SinglePlaylist from './SinglePlaylist';

export default class RoutePlaylists extends React.Component {

  render()
  {
    const { match } = this.props;

    const viewSinglePlaylistPath = match.url + "/:id/";

    return <Switch>
            <Route exact path={ viewSinglePlaylistPath } component={ SinglePlaylist}/>
            <Route component={ Playlists }/>
           </Switch>

  }
}
