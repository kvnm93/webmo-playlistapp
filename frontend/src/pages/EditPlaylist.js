import React, { Component } from 'react'
import Header from "../layout/header";
import {Col, Row, Button, message} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';
import {getPlaylist } from '../actions/app';
import { updatePlaylist } from '../actions/admin';
import PlaylistForm from "../components/forms/playlist-form";

class EditSong extends Component {

  constructor() {
    super()
    this.state = {
      data: {},
      errors: null
    }
  }

  componentDidMount() {
    const { match } = this.props;
    getPlaylist(match.params.id).then(data => {
        this.setState({...this.state, errors: data.error, data: data.data })
    })
  }

  componentDidUpdate () {
    console.log(this.state);
  }

  saveForm = (formRef) => {
    this.formdataEditPlaylist = formRef;
  }

  handleForm = () => {
    const { match, t } = this.props;
    const form = this.formdataEditPlaylist.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      console.log(values);
      updatePlaylist(match.params.id, {...values, songs: values.songs.map((e)=> { return e.key; })}).then(data => {
        message.success(t('messages:SUCCESSFULLY_UPDATED'));
      }).catch(err => {
        message.error(t('messages:UPDATE_FAILED'));
      })
    });
  }


  render () {
    const {t} = this.props;
    const { error, data } = this.state;

    const initialData = data ? {
      ...data, songs: data.songs ? data.songs.map((e) => { return {key: e.id, label: e.artist + " - " + e.title};}) : []}
     : {};

    return (
      <Row>
        <Header selectedKeys={['playlists']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <h2>{t('inline:EDIT_PLAYLIST')}</h2>
                  <PlaylistForm initialValues={initialData} wrappedComponentRef={this.saveForm}>
                    <Row type="flex" justify="end">
                      <Button type="primary" onClick={this.handleForm}>{t('buttons:SAVE_PLAYLIST')}</Button>
                    </Row>
                  </PlaylistForm>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline'])(EditSong);
