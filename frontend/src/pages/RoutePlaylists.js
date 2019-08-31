import React from 'react';
import {Col, Row} from "antd";
import { Switch, Route } from 'react-router';
import Playlists from './Playlists';
import SinglePlaylist from './SinglePlaylist';
import EditPlaylist from './EditPlaylist';
import CreatePlaylist from './CreatePlaylist';

export default class RoutePlaylists extends React.Component {

  render()
  {
    const { match } = this.props;

    const viewSinglePlaylistPath = match.url + "/:id/";
    const editSinglePlaylistPath = match.url + "/edit/:id/";
    const createSinglePlaylistPath = match.url + "/create/";

    return <Switch>
            <Route exact path={ createSinglePlaylistPath } component={ CreatePlaylist}/>
            <Route exact path={ viewSinglePlaylistPath } component={ SinglePlaylist}/>
            <Route exact path={ editSinglePlaylistPath } component={ EditPlaylist}/>
            <Route component={ Playlists }/>
           </Switch>

  }
}
