import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Button, NoticeBar} from 'antd-mobile';
import {login} from "../../redux/user.redux";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import HOcomponent from '../../component/HOComponent/HOcomponent'

@connect(
    state => state.user,
    {login}
)
@HOcomponent
class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this.props)
        // console.log("this.props.user:" + this.props.user)
    }

    register() {
        this.props.history.push('/register')
    }

    onClickLogin() {
        // console.log("this.props.state:" + JSON.stringify(this.props.state))
        this.props.login(this.props.state)
    }

    render() {
        const notice = (<NoticeBar mode="closable" icon={null}>{this.props.msg}</NoticeBar>)
        return (
            <div>
                {(this.props.redirectTo && this.props.redirectTo !== '/login') ?
                    <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WhiteSpace/>
                {this.props.msg ? notice : null}
                <List renderHeader={() => '登录/注册'}>
                    <InputItem
                        type="phone"
                        placeholder="186 1234 1234"
                        onChange={val => {
                            this.props.onChangeHandler('user', val)
                        }}
                    >手机号码</InputItem>
                    <InputItem
                        type="password"
                        placeholder="****"
                        onChange={val => {
                            this.props.onChangeHandler('password', val)
                        }}
                    >密码</InputItem>
                </List>
                <WhiteSpace/>

                <WhiteSpace/>
                <Button
                    type="primary"
                    style={{marginRight: '8px', marginLeft: '8px'}}
                    onClick={() => {
                        this.onClickLogin()
                    }}
                >登录</Button><WhiteSpace/>
                <Button
                    type="primary"
                    onClick={() => {
                        this.register()
                    }}
                    style={{marginRight: '8px', marginLeft: '8px'}}
                >注册</Button>
                <WhiteSpace/>
            </div>
        )
    }
}

export default Login