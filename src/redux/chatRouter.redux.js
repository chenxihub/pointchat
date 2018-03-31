import axios from 'axios'

const USER_LIST = 'USER_LIST';
const ERROR_MSG = 'ERROR_MSG';
const initState = {
    userList: []
};

//reducer
export function chatUser(state = initState, action) {
    switch (action.type) {
        case USER_LIST :
            return {...state, userList: action.payload}
        case ERROR_MSG :
            return {...state, msg: action.msg}
        default:
            return state
    }
}

/**
 * dispatch 函数
 * @returns {{type: string, payload}}
 */
function userList(data) {
    return {type: USER_LIST, payload: data}
}


//错误函数
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

/**
 * updata方法
 * @param data
 */
export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type=' + type)
            .then(res => {
                if (res.data.code === 0) {
                    //获取成功
                    // console.log('列表获取成功:' + JSON.stringify(res))
                    dispatch(userList(res.data.data))
                } else {
                    //获取失败，后端返回msg
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}