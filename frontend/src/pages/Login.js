import React from 'react'
import { login } from '../actions/auth';
import { Row, Col } from 'antd';
import Header from "../layout/header";
import {SmallBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import LoginForm from "../components/auth/login/login-form";

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {

    const user = {
      username: values.username,
      password: values.password
    }

    login(user).then(res => {
      if (res) {
        this.props.history.push(`/profile`)
      }
    })
  }

  render() {
    return (
      <Row>
        <Header selectedKeys={['login']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...SmallBoxGridLayout}>
            <Section>
              <SectionContent>
                <LoginForm onSubmit={this.onSubmit}/>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    )
  }
}

export default Login
