import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Button, Radio, NoticeBar} from 'antd-mobile';
import {connect} from 'react-redux'
import {register} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom'
import HOcomponent from '../../component/HOComponent/HOcomponent'

@connect(
    state => state.user,
    {register}
)

@HOcomponent
class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     type: "genius",
        //     user: '',
        //     password: '',
        //     repassword: ''
        // }
    }

    componentDidMount() {
        this.props.onChangeHandler('type', 'genius')
    }

    onRegister() {
        console.log(this.props)
        this.props.register(this.props.state);
    }


    render() {
        const RadioItem = Radio.RadioItem;
        const notice = (<NoticeBar mode="closable" icon={null}>{this.props.msg}</NoticeBar>)
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
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
                        placeholder="password"
                        onChange={val => {
                            this.props.onChangeHandler('password', val)
                        }}
                    >密码</InputItem>
                    <InputItem
                        type="password"
                        placeholder="sure you password"
                        onChange={val => {
                            this.props.onChangeHandler('repassword', val)
                        }}
                    >确认密码</InputItem>
                </List>
                <WhiteSpace/>
                <List renderHeader={() => '选择你的身份'}>
                    <RadioItem
                        checked={this.props.state.type === 'genius'}
                        onChange={val => this.props.onChangeHandler('type', 'genius')}
                    >牛人</RadioItem>
                    <RadioItem
                        checked={this.props.state.type === 'boss'}
                        onChange={val => this.props.onChangeHandler('type', 'boss')}
                    >Boss</RadioItem>
                </List>
                <WhiteSpace/>
                <Button
                    type="primary"
                    style={{marginRight: '8px', marginLeft: '8px'}}
                    onClick={() => {
                        this.onRegister()
                    }}
                >注册</Button><WhiteSpace/>
            </div>
        )
    }
}

export default Register