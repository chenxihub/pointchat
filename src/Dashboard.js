import React from 'react'
import {Link, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout, getUserData} from "./Auth/Auth.redux";
import App from './App'


function Two() {
    return <p>two</p>
}

function Three() {
    return <p>three</p>
}

@connect(
    state => state.auth,
    {logout, getUserData}
)

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.getUserData();
    }

    render() {
        // console.log('dashboard:' + JSON.stringify(this.props));
        const match = this.props.match;
        const app = (
            <div>
                <h1>首页</h1>
                <p></p>
                {this.props.isAuth ? <button onClick={this.props.logout}>注销</button> : null}
                <ul>
                    <li><Link to={`${match.url}/`}>One</Link></li>
                    <li><Link to={`${match.url}/two`}>Two</Link></li>
                    <li><Link to={`${match.url}/three`}>Three</Link></li>
                </ul>
                <Route path={`${match.url}/`} exact component={App}/>
                <Route path={`${match.url}/two`} component={Two}/>
                <Route path={`${match.url}/three`} component={Three}/>
            </div>
        );

        const redirectToLogin = <Redirect to={'/login'}/>
        return this.props.isAuth ? app : redirectToLogin

    }
}

export default Dashboard;