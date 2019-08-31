import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Button, message} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';

import {createPlaylist} from '../actions/admin';
import PlaylistForm from "../components/forms/playlist-form";

class EditSong extends Component {

  constructor() {
    super()
    this.state = {
      data: {},
      errors: null
    }
  }


  componentDidUpdate () {
    console.log(this.state);
  }

  saveForm = (formRef) => {
    this.formdataCreatePlaylist = formRef;
  }

  handleForm = () => {
    const { match, t } = this.props;
    const form = this.formdataCreatePlaylist.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      createPlaylist(match.params.id, values).then(data => {
        message.success(t('messages:SUCCESSFULLY_CREATED'));
      }).catch(err => {
        message.error(t('messages:CREATION_FAILED'));
      })
    });
  }


  render () {
    const {t} = this.props;
    const { error, data } = this.state;

    return (
      <Row>
        <Header selectedKeys={['playlists']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <h2>{t('inline:CREATE_PLAYLIST')}</h2>
                  <PlaylistForm >
                    <Row type="flex" justify="end">
                      <Button type="primary" onClick={this.handleForm}>{t('buttons:CREATE_PLAYLIST')}</Button>
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
