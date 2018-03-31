import React from 'react'
import PropTypes from 'prop-types'
import {WhiteSpace, Card} from 'antd-mobile'
import '../boss/boss.css'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v}`)
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                {this.props.userList.map((v, index) => {
                    return (
                        <Card
                            full
                            key={v._id}
                            style={{marginBottom: '15px'}}
                            onClick={() => {
                                // console.log("v:" + JSON.stringify(v))
                                this.handleClick(v._id)
                            }}
                        >
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.jpg`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {v.desc.split('\n').map((text, index) => {
                                    return (
                                        <div key={index}>{text}</div>
                                    )
                                })}
                            </Card.Body>
                            <Card.Footer
                                content={v.type === 'boss' ? <p>薪资:{v.money}</p> : null}
                            />
                            <Card.Footer
                                content={v.type === 'genius' ? <p>公司:{v.company}</p> : null}
                            />
                        </Card>
                    )
                })}

            </div>
        )
    }
}

export default UserCard