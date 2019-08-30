import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'
import Header from "../layout/header";
import {Col, Row, Icon, Card, Tabs, Input, Button} from "antd";
import {DefaultBoxGridLayout} from "../utils/grid-layout";
import {Section, SectionContent} from "../components/section";
import {withNamespaces} from 'react-i18next';
import {getPlaylists, followPlaylist, unfollowPlaylist} from '../actions/app';
import {Link, withRouter} from 'react-router-dom'

const {TabPane} = Tabs;
const {Meta} = Card;
const {Search} = Input;

class Playlists extends Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
      my_playlists: [],
      errors: null
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    getPlaylists().then(data => {
      this.setState({...this.state, errors: data.error, playlists: data.data})
    })

  }

  componentDidUpdate() {
    console.log(this.state);
  }

  updateFollow = (element) => {
    if (element.followers.length > 0) {
      unfollowPlaylist(element.id).then(data => {
        this.setState({
          ...this.state,
          playlists: this.state.playlists.map((e) => {
            return {...e, followers: e.id === element.id ? [] : e.followers};
          }),
          my_playlists: this.state.my_playlists.filter((e) => {
            return e.id !== element.id
          })
        }, () => {
          console.log(this.state)
        })
      })
    } else {
      followPlaylist(element.id).then(data => {
        this.setState({
          ...this.state,
          playlists: this.state.playlists.map((e) => {
            return {...e, followers: e.id === element.id ? [{id: null}] : e.followers};
          }),
          my_playlists: [...this.state.my_playlists, {...element, followers: [{id: null}]}]
        }, () => {
          console.log(this.state)
        });
      })
    }

  }

  getActionBar = (e) => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    const actions = [
      <Icon type="heart"
            key="heart"
            onClick={() => {
              this.updateFollow(e)
            }}
            theme={e.followers.length > 0 ? "filled" : ""}
            style={e.followers.length > 0 ? {color: "red"} : {}}
      />,
      <Link to={"/playlists/" + e.id}><Icon type="folder-open" key="open"/></Link>
    ];

    if (decoded.roles[0].id === 1) {
      actions.push(
        <Icon type="delete" />,
        <Icon type="edit" />,
      )
    }

    return actions;
  }

  render() {
    const {t} = this.props;
    const {error, playlists} = this.state;


    return (
      <Row>
        <Header selectedKeys={['playlists']}/>
        <Row type="flex" justify="center" style={{marginTop: 40}}>
          <Col {...DefaultBoxGridLayout}>
            <Section>
              <SectionContent>
                <Row>
                  <h2>Playlists</h2>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab={t('inline:ALL')} key="1">
                      <Row gutter={16}>
                        {playlists && playlists.length > 0 && playlists.map((e) => {
                          return (
                            <Col {...{xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6}} key={e.id} style={{marginBottom: 20}}>
                              <Row type="flex" justify="center">

                                <Card
                                  hoverable
                                  actions={this.getActionBar(e)}
                                  style={{width: "100%"}}
                                  cover={<img alt="cover" src={e.cover}/>}
                                >
                                  <Meta title={e.name} description={e.description}/>
                                </Card>

                              </Row>
                            </Col>
                          )
                        })
                        }
                      </Row>
                    </TabPane>
                    <TabPane tab={t('inline:FOLLOWING')} key="2">
                      <Row gutter={16}>
                        {playlists && playlists.length > 0 && playlists.map((e) => {
                          if (e.followers.length > 0)
                            return (
                              <Col {...{xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6}} key={e.id} style={{marginBottom: 20}}>
                                <Row type="flex" justify="center">

                                  <Card
                                    hoverable
                                    actions={this.getActionBar(e)}
                                    style={{width: "100%"}}
                                    cover={<img alt="cover" src={e.cover}/>}
                                  >
                                    <Meta title={e.name} description={e.description}/>
                                  </Card>

                                </Row>
                              </Col>
                            )
                        })
                        }
                      </Row>
                    </TabPane>
                  </Tabs>

                </Row>
              </SectionContent>
            </Section>
          </Col>
        </Row>
      </Row>
    );
  }

}

export default withNamespaces(['inline', 'placeholders'])(Playlists);
