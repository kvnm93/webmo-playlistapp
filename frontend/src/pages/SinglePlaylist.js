import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Table} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';
import {getPlaylist } from '../actions/app';
import {secondsToMinutes} from "../utils";

class SinglePlaylist extends Component {

  constructor() {
    super()
    this.state = {
      data: null,
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

  render () {
    const {t} = this.props;
    const { error, data } = this.state;
    const columns = [
      {
        title: t('inline:TITLE'),
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: t('inline:ARTIST'),
        dataIndex: 'artist',
        key: 'artist',
      },
      {
        title: t('inline:GENRE'),
        dataIndex: 'genre',
        key: 'genre',
      },
      {
        title: t('inline:LENGTH'),
        dataIndex: 'length',
        key: 'length',
        render: data => { return secondsToMinutes(data) },
      }
    ];


    return (
      <Row>
        <Header selectedKeys={['playlists']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                  { data &&
                    <Row>
                      <Row style={{marginBottom: 20}}>
                          <Col span={8}>
                              <img src={data.cover} style={{width: "100%"}}/>
                          </Col>
                          <Col span={16}>
                              <div style={{fontSize: 28, fontWeight: "bold"}}>{data.name}</div>
                              <div style={{marginBottom:10}}>{data.followers ? data.followers.length : 0} {t('inline:FOLLOWERS')}</div>
                              <h3>{t('inline:BY')} {data.creator.first_name} {data.creator.last_name}</h3>
                              <Row style={{marginTop:20}}>{data.description}</Row>
                          </Col>
                      </Row>
                        <Row>
                          <Table pagination={false} dataSource={data.songs} columns={columns} />
                        </Row>
                    </Row>
                  }
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline'])(SinglePlaylist);
