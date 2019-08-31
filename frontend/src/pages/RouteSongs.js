import React from 'react';
import { Switch, Route } from 'react-router';
import Songs from './Songs';
import EditSong from './EditSong';
import CreateSong from './CreateSong';

export default class RouteSongs extends React.Component {

  render()
  {
    const { match } = this.props;

    const editSingleSongPath = match.url + "/edit/:id/";
    const createSingleSongPath = match.url + "/create/";

    return <Switch>
            <Route exact path={ editSingleSongPath } component={ EditSong }/>
            <Route exact path={ createSingleSongPath } component={ CreateSong }/>
            <Route component={ Songs }/>
           </Switch>

  }
}
