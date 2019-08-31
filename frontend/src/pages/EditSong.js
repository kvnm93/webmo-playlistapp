import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Button, message} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';
import {getSong } from '../actions/app';
import { updateSong } from '../actions/admin';
import {secondsToMinutes} from "../utils";
import SongForm from "../components/forms/song-form";

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
    getSong(match.params.id).then(data => {
        this.setState({...this.state, errors: data.error, data: data.data })
    })
  }

  componentDidUpdate () {
    console.log(this.state);
  }

  saveForm = (formRef) => {
    this.formdataEditSong = formRef;
  }

  handleForm = () => {
    const { match, t } = this.props;
    const form = this.formdataEditSong.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      updateSong(match.params.id, values).then(data => {
        message.success(t('messages:SUCCESSFULLY_UPDATED'));
      }).catch(err => {
        message.error(t('messages:UPDATE_FAILED'));
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
                <h2>{t('inline:EDIT_SONG')}</h2>
                <SongForm initialValues={data} wrappedComponentRef={this.saveForm}>
                  <Row type="flex" justify="end">
                    <Button type="primary" onClick={this.handleForm}>{t('buttons:SAVE_SONG')}</Button>
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

export default withNamespaces(['inline'])(EditSong);
