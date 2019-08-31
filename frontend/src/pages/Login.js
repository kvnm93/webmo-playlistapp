import React from 'react'
import { login } from '../actions/auth';
import { Row, Col, Alert} from 'antd';
import Header from "../layout/header";
import {SmallBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import LoginForm from "../components/auth/login/login-form";

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      errors: null
    }

  }

  onSubmit = (values) => {

    const user = {
      username: values.username,
      password: values.password
    }

    login(user).then(res => {
      if (res) {
        window.location = "/profile";
      }
    }).catch(err => {
      console.log(err);
      this.setState({...this.state, errors: err.response.data});
    })
  }

  render() {
    const { errors } = this.state;
    console.log(errors);
    return (
      <Row>
        <Header selectedKeys={['login']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...SmallBoxGridLayout}>
            <Section>
              <SectionContent>
                <Row type="flex" justify="center">
                    <h2>Login</h2>
                </Row>
                {
                  errors &&
                    <Alert style={{marginBottom: 20}} message={errors.error} type="error" />
                }
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
