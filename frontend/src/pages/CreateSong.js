import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Button, message} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';
import { createSong } from '../actions/admin';
import SongForm from "../components/forms/song-form";

class CreateSong extends Component {

  constructor() {
    super()
    this.state = {
      data: {},
      errors: null
    }
  }

  saveForm = (formRef) => {
    this.formdataCreateSong = formRef;
  }

  handleForm = () => {
    const { match, t } = this.props;
    const form = this.formdataCreateSong.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      createSong(values).then(data => {
        message.success(t('messages:SUCCESSFULLY_CREATED'));
        this.props.history.push("/songs");
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
        <Header selectedKeys={['songs']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <h2>{t('inline:CREATE_SONG')}</h2>
                <SongForm wrappedComponentRef={this.saveForm}>
                  <Row type="flex" justify="end">
                    <Button type="primary" onClick={this.handleForm}>{t('buttons:CREATE_SONG')}</Button>
                  </Row>
                </SongForm>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline'])(CreateSong);
