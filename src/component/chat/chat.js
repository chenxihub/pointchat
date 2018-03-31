import React from 'react'
import {List, InputItem, Button, NavBar, Icon} from 'antd-mobile';
import './chat.css'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg} from "../../redux/chat.redux";

/**
 * 获取工具类，chatID 拼接
 */
import {getChatId} from '../../util'

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        if (!this.props.chatMsg.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    handlerSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        console.log(from, "_", to, "_", msg);
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: ''
        })
    }

    //获取聊天时间
    getChatTime(timeline) {
        const date = new Date(timeline);
        //date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " +
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }

    render() {
        const userid = this.props.match.params.user;//from用户的ID
        const Item = List.Item;
        const Brief = Item.Brief;
        const users = this.props.chatMsg.users;
        const chatId = getChatId(userid, this.props.user._id);
        const msgBox = this.props.chatMsg.chatMsg.filter(v => v.chatid === chatId);
        if (!users[userid]) {
            return null;
        }
        return (
            <div>
                <NavBar
                    mode={'dark'}
                    style={{position: 'fixed', width: '100%', top: 0, zIndex: '99'}}
                    icon={<Icon type={'left'}/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                <div className={"chatList"} style={{marginTop: '45px'}}>
                    {msgBox.map((v, index) => {
                        const avatar = require(`../img/${users[v.from].avatar}.jpg`);
                        // console.log(index, "|", v)
                        return v.from === userid ? (
                            <div className={'ToFrom'} key={v._id}>
                                <List>
                                    <Item
                                        extra={users[v.from].name}
                                        align="top"
                                        thumb={avatar}
                                        multipleLine>
                                        {v.content}
                                        <Brief>{this.getChatTime(v.time)}</Brief>
                                    </Item>
                                </List>
                            </div>
                        ) : (
                            <div key={v._id} className={'MySend'}>
                                <List>
                                    <Item
                                        // extra={users[v.to].name}
                                        align="top"
                                        thumb={avatar}
                                        multipleLine>
                                        {v.content}
                                        <Brief>{this.getChatTime(v.time)}</Brief>
                                    </Item>
                                </List>
                            </div>
                        )
                    })}
                </div>
                <div className={"InputClass"}>
                    <List>
                        <InputItem
                            placeholder={'请输入'}
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={<Button
                                type="primary"
                                size="small"
                                inline
                                onClick={() => {
                                    this.handlerSubmit()
                                }}
                            >发送</Button>}
                        />
                    </List>
                </div>

            </div>
        )
    }
}

export default Chat