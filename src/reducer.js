//reducer 的合并 并且返回

import {combineReducers} from 'redux'
// import {counter} from './index.redux'
// import {auth} from './Auth/Auth.redux'
import {user} from './redux/user.redux'
import {chatUser} from "./redux/chatRouter.redux";
import {chatMsg} from "./redux/chat.redux";

export default combineReducers({user, chatUser,chatMsg})