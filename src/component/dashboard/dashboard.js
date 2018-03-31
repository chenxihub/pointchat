import React from 'react'
import {NavBar} from 'antd-mobile';
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import NavLink from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Me from '../me/me'
import Msg from '../message/message'
import {getMsgList, recvMsg} from "../../redux/chat.redux";

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.props.chatMsg.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: '老板',
                icon: 'boss',
                title: '老板',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'boss',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我的',
                icon: 'boss',
                title: '个人中心',
                component: Me
            }
        ];

        return (
            <div>
                <div style={{position: 'fixed', width: '100%', top: 0}}>
                    <NavBar
                        mode={'dark'}
                    >
                        {navList.find(value => value.path === pathname).text}
                    </NavBar>
                </div>
                <div style={{marginTop: '45px'}}>
                    {/*跳转不同页面展示不同的内容*/}
                    <Switch>
                        {navList.map(value => (
                            <Route key={value.path} path={value.path} component={value.component}/>
                        ))}
                    </Switch>
                </div>
                <NavLink data={navList}/>
            </div>
        )
    }
}

export default Dashboard