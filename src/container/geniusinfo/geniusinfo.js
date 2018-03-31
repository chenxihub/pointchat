import React from 'react'
import {NavBar, List, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile';
import AvatarSelector from '../../component/avatarSelector/AvatarSelector'
import {Redirect} from 'react-router-dom'
/**
 * 构造器，链接reduce
 */

import {connect} from 'react-redux'
import {update} from "../../redux/user.redux";

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            company: '',
            title: '',
            money: '',
            desc: ''

        }
    }

    onChangeHandler(key, val) {
        this.setState({
            [key]: val
        })
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar>BOSS完善信息</NavBar>
                <AvatarSelector
                    //向子组件传递一个函数，返回修改当前state
                    selectAvatar={(imgname) => {
                        this.setState({
                            avatar: imgname
                        })
                    }}
                />
                <List renderHeader={() => '完善公司信息'}>
                    <InputItem
                        placeholder="公司名称"
                        onChange={val => {
                            this.onChangeHandler('company', val)
                        }}
                    >公司名称</InputItem>
                    <InputItem
                        placeholder="招聘职位"
                        onChange={val => {
                            this.onChangeHandler('title', val)
                        }}
                    >招聘职位</InputItem>
                    <InputItem
                        placeholder="职位薪资"
                        onChange={val => {
                            this.onChangeHandler('money', val)
                        }}
                    >职位薪资</InputItem>
                </List>
                <List renderHeader={() => '职位简介'}>
                    <TextareaItem
                        onChange={val => {
                            this.onChangeHandler('desc', val)
                        }}
                        placeholder="职位简介"
                        rows={5}
                        count={300}
                        autoHeight
                    />
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button
                    type="primary"
                    style={{marginRight: '8px', marginLeft: '8px'}}
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                >提交</Button><WhiteSpace/>
            </div>
        )
    }
}

export default GeniusInfo