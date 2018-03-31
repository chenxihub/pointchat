import React from 'react'
import {Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const avatarList = '2,3,4,5,6,7,8,9'.split(',').map(value => ({
            icon: require(`../img/${value}.jpg`),
            text: `${value}`
        }));
        const gridHeader = this.state.icon ?
            <img src={this.state.icon} style={{width: '30px', height: '30px', borderRadius: '50%'}} alt=""/> : ''
        return (
            <div>
                <div
                    style={{color: '#888', fontSize: '14px', padding: '20px 0 9px 15px',}}
                >
                    选择心爱的头像 : {gridHeader}
                </div>
                <Grid
                    data={avatarList}
                    columnNum={4}
                    renderItem={dataItem => (
                        <div style={{padding: '12.5px'}}>
                            <img src={dataItem.icon} style={{width: '75px', height: '75px'}} alt=""/>
                        </div>
                    )}
                    onClick={elm => {
                        this.setState(elm);
                        this.props.selectAvatar(elm.text)
                    }}
                />
            </div>
        )
    }
}

export default AvatarSelector