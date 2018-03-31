import React from 'react'
import {TabBar} from 'antd-mobile';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
    state => state.chatMsg
)
class NavLink extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const navList = this.props.data.filter(value => !value.hide);
        const {pathname} = this.props.location
        return (
            <div style={{position: 'fixed', width: '100%', bottom: 0}}>

                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    {navList.map(value => (
                        <TabBar.Item
                            title={value.text}
                            key={value.path}
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                            }
                            selected={pathname === value.path}
                            badge={value.path === '/msg' ? this.props.unread : null}
                            data-seed="logId"
                            onPress={() => {
                                this.props.history.push(value.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLink