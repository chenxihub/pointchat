import axios from 'axios'
import io from "socket.io-client";

const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';
const initState = {
    chatMsg: [],
    users: {},
    unread: 0
};

//reducer
export function chatMsg(state = initState, action) {
    switch (action.type) {
        case MSG_LIST :
            return {
                ...state,
                users: action.payload.users,
                chatMsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userId).length
            }
        case MSG_RECV :
            const n = action.payload.to === action.userId ? 1 : 0;
            return {...state, chatMsg: [...state.chatMsg, action.payload], unread: state.unread + n}
        case MSG_READ :
            return {...state, ...action.payload}
        default:
            return state
    }
}

/**
 * action creater
 */
function msgList(msgs, users, userId) {
    return {type: MSG_LIST, payload: {msgs, users, userId}}
}

function msgRecv(msg, userId) {
    return {userId, type: MSG_RECV, payload: msg}
}

/**
 * 获取聊天信息列表
 * @returns {function(*)}
 * dispatch 的第一个参数书触发action
 * 第二个参数是获取所有的状态 getState
 */
export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/chat/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(getState())
                    const userId = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userId))
                }
            })
    }
}

/**
 * 发送打包聊天信息到后台
 * @param from
 * @param to
 * @param msg
 * @returns {function(*)}
 */
export function sendMsg({from, to, msg}) {
    return dipatch => {
        socket.emit('sendMsg', {from, to, msg})
    }
}

/**
 * 监听后台返回的聊天最新数据
 * @returns {function(*)}
 */
export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvMsg', (msg) => {
            // console.log('recvMsg', msg);
            const userId = getState().user._id;
            dispatch(msgRecv(msg, userId))
        })
    }
}