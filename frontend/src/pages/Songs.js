import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Input, Table, Divider, Popconfirm, message, Button} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import { withNamespaces } from 'react-i18next';
import {getSongs} from '../actions/app';
import { deleteSong, updateSong } from '../actions/admin';
import {secondsToMinutes} from "../utils";

const { Search } = Input;

class Songs extends Component {
  constructor() {
    super()
    this.state = {
        songs: [],
        errors: {}
    }
  }

  componentDidMount() {
    getSongs().then(data => {
      this.setState({...this.state, songs: data.data, errors: data.error});
    }).catch(err => {
        message.error(err);
      }
    )
  }

  onSearch = (value) => {
    getSongs(value).then(data => {
      this.setState({...this.state, songs: data.data, errors: data.error});
    }).catch(err => {
        message.error(err);
      }
    )
  }

  onClickDelete = (id) => {
    const {t} = this.props;
    deleteSong(id).then(data => {
      this.setState({...this.state, songs: this.state.songs.filter((e)=> { return e.id !== id })}, () => {
        message.success(t('messages:SUCCESSFULLY_DELETED_SONG'));
      });
    }).catch(err => {
        message.error(err);
      }
    )
  }

  onClickEdit = (id) => {
    this.props.history.push(`/songs/edit/${id}`)
  }

  getColumns = () => {
    const {t} = this.props;
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

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

    if (decoded.roles[0].id === 1) {
      columns.push({
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Popconfirm
              title={t('messages:CONFIRM_DELETE_SONG')}
              onConfirm={() => {this.onClickDelete(record.id)}}
              okText={t('inline:YES')}
              cancelText={t('inline:NO')}
            >
              <a>{t('inline:DELETE')}</a>
            </Popconfirm>

            <Divider type="vertical" />
            <a onClick={() => {this.onClickEdit(record.id)}}>{t('inline:EDIT')}</a>
          </span>
        ),
      })
    }

    return columns;
  }

  render () {
    const {t} = this.props;
    const { songs } = this.state;
    const columns = this.getColumns();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    return (
      <Row>
        <Header selectedKeys={['songs']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <Row>
                    <h2>Songs</h2>

                    <Row>
                      <Col span={decoded.roles[0].id === 1 ? 18 : 24}>
                        <Search placeholder={t('placeholders:SEARCH_FOR_SONGS')} onSearch={this.onSearch} enterButton />
                      </Col>
                      { decoded.roles[0].id === 1 &&
                        <Col span={6}>
                          <Button style={{marginLeft: 5, width: "100%"}} type="primary" onClick={() => { this.props.history.push("/songs/create") }}>{t('buttons:ADD')}</Button>
                        </Col>
                      }
                    </Row>
                    <Row style={{marginTop:20}}>
                      <Table pagination={false} dataSource={songs} columns={columns} />
                    </Row>
                </Row>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline', 'placeholders', 'messages'])(Songs);
