import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import reducers from './reducer'
import './config'
import AuthRoute from './component/authRoute/AuthRoute'

//引入组件
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

//redux 的测试工具配置
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

//创建存储仓库store
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevTools
));

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <AuthRoute></AuthRoute>
                    <Switch>
                        <Route path={'/login'} exact component={Login}/>
                        <Route path={'/register'} component={Register}/>
                        <Route path={'/bossinfo'} component={BossInfo}/>
                        <Route path={'/geniusinfo'} component={GeniusInfo}/>
                        <Route path={'/chat/:user'} component={Chat}/>
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);
