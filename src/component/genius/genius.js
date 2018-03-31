import React from 'react'
import {getUserList} from "../../redux/chatRouter.redux";
import {connect} from 'react-redux'
import UserCard from '../userCard/userCard'

@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component {

    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (
            <UserCard userList={this.props.userList}/>
        )
    }
}

export default Genius