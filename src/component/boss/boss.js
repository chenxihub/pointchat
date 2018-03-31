import React from 'react'
import './boss.css'
import {getUserList} from "../../redux/chatRouter.redux";
import {connect} from 'react-redux'
import UserCard from '../userCard/userCard'

@connect(
    state => state.chatUser,
    {getUserList}
)
class Boss extends React.Component {

    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return (
            <UserCard userList={this.props.userList}/>
        )
    }
}

export default Boss