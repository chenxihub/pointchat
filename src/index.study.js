import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import reducers from './reducer'

import './config'
import 'antd-mobile/dist/antd-mobile.css'


import Auth from './Auth/Auth'
import Dashboard from './Dashboard'

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
                <Switch>
                    <Route path={'/login'} exact component={Auth}/>
                    <Route path={'/dashboard'} component={Dashboard}/>
                    <Redirect to={'/dashboard'}></Redirect>
                </Switch>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);
