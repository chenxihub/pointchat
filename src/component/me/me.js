import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'browser-cookies'
import {logoutSubmit} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {logoutSubmit}
)

class Me extends React.Component {
    layout() {
        const alert = Modal.alert;
        alert('退出登录', '确认退出么？', [
            {text: '取消', onPress: () => console.log('cancel')},
            {
                text: '确认', onPress: () => {
                    this.props.logoutSubmit();
                    // console.log(Cookies.get('uid'))
                    Cookies.erase('uid');
                }
            },
        ])


    }

    render() {
        const {avatar, user, company, title} = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        const props = this.props;
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${avatar}.jpg`)} alt=""
                              style={{borderRadius: '50%', width: '60px', height: '60px'}}/>}
                    title={user}
                    message={`${title} || ${company}`}
                />
                <List renderHeader={() => '简介'} className="my-list">
                    <Item multipleLine extra="extra content">
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资:{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace/>

                <Button
                    type="warning"
                    onClick={() => {
                        this.layout()
                    }}
                    style={{marginRight: '8px', marginLeft: '8px'}}
                >退出登录</Button>
                <WhiteSpace/>
            </div>
        ) : <Redirect to={props.redirectTo}/>


    }
}

export default Me