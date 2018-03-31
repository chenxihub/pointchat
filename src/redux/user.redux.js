import axios from 'axios'
import {getRedirectPath} from "../util";

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    msg: '',
    user: '',
    type: ''
};

//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS :
            return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA :
            return {...state, ...action.payload}
        case LOGOUT :
            return {...initState, redirectTo: './login'}
        case ERROR_MSG :
            return {...state, isAuth: false, msg: action.msg}
        default:
            return state
    }
}

//首页进入的时候开始判断是否是登录状态的函数
export function loadData(userinfo) {
    return {type: LOAD_DATA, payload: userinfo}
}

//成功函数
// function registerSuccess(data) {
//     return {type: REGISTER_SUCCESS, payload: data}
// }

/**
 * 合并登录 注册 更新的函数
 * @param data
 * @returns {{type: *, payload: *}}
 */
function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data}
}

//错误函数
function errorMsg(msg) {
    return {msg, type: ERROR_MSG}
}

//注册函数
export function register({user, password, repassword, type}) {
    if (!user || !password || !type) {
        return errorMsg('用户名密码错误')
    }
    if (password !== repassword) {
        return errorMsg('两次密码输入不一致')
    }
    return dispatch => {
        axios.post('/user/register', {user, password, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    //注册成功
                    console.log('注册成功:' + {user, password, type})
                    dispatch(authSuccess({user, password, type}))
                } else {
                    //注册失败，后端返回msg
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//成功函数
// function loginSuccess(data) {
//     return {type: LOGIN_SUCCESS, payload: data}
// }

//登录函数
export function login({user, password}) {
    if (!user || !password) {
        return errorMsg('用户名密码不能为空')
    }
    return dispatch => {
        axios.post('/user/login', {user, password})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    //登录成功
                    console.log('登录成功:' + res.data.data)
                    dispatch(authSuccess(res.data.data))
                } else {
                    //登录失败，后端返回msg
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

/**
 * updata方法
 * @param data
 */
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    //更新成功
                    console.log('更新成功:' + JSON.stringify(data))
                    dispatch(authSuccess(res.data.data))
                } else {
                    //更新失败，后端返回msg
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function logoutSubmit() {
    return {type: LOGOUT}
}