import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import './message.css'

@connect(
    state => state
)
class Msg extends React.Component {
    /**
     * 取最后一条数据
     * @returns {*}
     */
    getLast(arr) {
        return arr[arr.length - 1]
    }

    componentDidMount() {
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        // console.log(this.props);id
        //当前登录用户的id
        const userid = this.props.user._id;
        const userInfo = this.props.chatMsg.users;
        /**
         * 对象的分组
         * @type {{}}
         */
        const msgGroup = {};
        this.props.chatMsg.chatMsg.forEach(value => {
            msgGroup[value.chatid] = msgGroup[value.chatid] || [];
            msgGroup[value.chatid].push(value)
        });
        // console.log(msgGroup);
        /**
         * Object values 取出所有值
         * @type {any[]}
         */
        const chatlist = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).time;
            const b_last = this.getLast(b).time;
            // console.log(a_last, b_last)
            return b_last - a_last;
        });
        // console.log(chatlist);

        return (
            <div>
                <List>
                    {chatlist.map((value, index) => {
                        // console.log(index + ":" + JSON.stringify(value));
                        const lastItem = this.getLast(value);
                        const targetId = value[0].from === userid ? value[0].to : value[0].from;
                        const unreadNum = value.filter(v => !v.read && v.to === userid).length;
                        // console.log("unreadNum" + unreadNum)
                        if (!userInfo[targetId]) {
                            return null
                        }
                        // const name = userInfo[targetId]? userInfo[targetId].name:'';
                        // const avatar = userInfo[targetId]? userInfo[targetId].avatar:'';
                        // console.log(targetId);
                        // console.log(lastItem)
                        return (
                            <Item
                                key={lastItem._id}
                                thumb={require(`../img/${userInfo[targetId].avatar}.jpg`)}
                                extra={<Badge text={unreadNum}/>}
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>
                                    {userInfo[targetId].name}
                                </Brief>

                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg