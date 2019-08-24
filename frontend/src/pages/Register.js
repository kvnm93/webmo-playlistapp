import React, { Component } from 'react'
import { register } from '../actions/auth'
import Header from "../layout/header";
import {Col, Row} from "antd";
import {SmallBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import LoginForm from "../components/auth/login/login-form";
import SignupForm from "../components/auth/signup-form";

class Register extends Component {
  constructor() {
    super()
    this.state = {
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
  }


  onSubmit(values) {

    const newUser = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.username,
      password: values.password,
      user_roles: values.user_roles,
      language: values.language
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render () {
    return (
      <Row>
        <Header selectedKeys={['register']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...SmallBoxGridLayout}>
            <Section>
              <SectionContent>
                <SignupForm onSubmit={this.onSubmit}/>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default Register
