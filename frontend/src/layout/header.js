import React from 'react';
import {Layout, Menu } from 'antd';
import { withNamespaces } from 'react-i18next';
import { LanguageSelect } from "../components/language-select";
import {Mobile, Default} from '../utils/viewports';
import {slide as BurgerMenu} from "react-burger-menu";
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {

    logout = () => {
        localStorage.removeItem('usertoken');
        window.location = "/";
    };

    handleChange = (lng) => {
      const { i18n } = this.props;
      i18n.changeLanguage(lng);
    }

    render() {
        const { t, selectedKeys, i18n } = this.props;

        const loginRegisterDesktop = (
            <Menu theme="dark" mode="horizontal" style={{ position: 'absolute', right: 0, lineHeight: '64px' }} selectedKeys={ selectedKeys }>
                <Menu.Item key="login">
                  <Link to={"/login"}>{t('inline:LOGIN')}</Link>
                </Menu.Item>
                <Menu.Item key="register">
                  <Link to={"/register"}>{t('inline:REGISTER')}</Link>
                </Menu.Item>
                <Menu.Item>
                  <LanguageSelect onChangeLanguage={this.handleChange} defaultValue={i18n.language ? i18n.language : "de"}/>
                </Menu.Item>
            </Menu>
        );

        const loggedInDesktop = (
            <Menu theme="dark" mode="horizontal" style={{ position: 'absolute', right: 0, lineHeight: '64px' }} selectedKeys={ selectedKeys }>
                <Menu.Item key="profile">
                  <Link to={"/profile"}>{t('inline:PROFILE')}</Link>
                </Menu.Item>
                <Menu.Item key="songs">
                  <Link to={"/songs"}>{t('inline:SONGS')}</Link>
                </Menu.Item>
                <Menu.Item key="playlists">
                  <Link to={"/playlists"}>{t('inline:PLAYLISTS')}</Link>
                </Menu.Item>
                <Menu.Item onClick={ this.logout }>
                  Logout
                </Menu.Item>
                <Menu.Item>
                  <LanguageSelect onChangeLanguage={this.handleChange} defaultValue={i18n.language ? i18n.language : "de"}/>
                </Menu.Item>
            </Menu>
        );

        return <Layout.Header>
                <Mobile>
                  <div style={{fontSize:30, fontWeight: "bold", position: "absolute", left: 40, color: "white"}}>PlaylistApp</div>
                  <BurgerMenu right>
                    <a><Link to={"/profile"}>{t('inline:PROFILE')}</Link></a>
                    <a><Link to={"/songs"}>{t('inline:SONGS')}</Link></a>
                    <a><Link to={"/playlists"}>{t('inline:PLAYLISTS')}</Link></a>
                    <a onClick={this.logout}>{t('inline:LOGOUT')}</a>
                  </BurgerMenu>
                </Mobile>
                <Default>
                    <div style={{fontSize:30, fontWeight: "bold", position: "absolute", left: 40, color: "white"}}>PlaylistApp</div>
                    {localStorage.usertoken ? loggedInDesktop : loginRegisterDesktop}
                </Default>
              </Layout.Header>
    }
}


export default withNamespaces(['inline'])(withRouter(Header));