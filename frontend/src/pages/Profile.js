import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Descriptions} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      user_roles: [],
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    if (!token) {
      window.location = "/"
    }
    const decoded = jwt_decode(token);

    this.setState({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      username: decoded.username,
      user_roles: decoded.roles
    })
  }

  render () {
    const {t} = this.props;
    return (
      <Row>
        <Header selectedKeys={['profile']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <Descriptions title={t('inline:USER_INFO')} bordered>
                  <Descriptions.Item label={t('inline:FIRST_NAME')} span={3}>{this.state.first_name}</Descriptions.Item>
                  <Descriptions.Item label={t('inline:LAST_NAME')} span={3}>{this.state.last_name}</Descriptions.Item>
                  <Descriptions.Item label={t('inline:USERNAME')} span={3}>{this.state.username}</Descriptions.Item>
                  <Descriptions.Item label={t('inline:USER_ROLE')} span={3}>{this.state.user_roles.length > 0 && this.state.user_roles.map((e) => { return t('options:'+e.name) }).join(", ")}</Descriptions.Item>
                </Descriptions>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline'])(Profile);
