import React from 'react'

export default function HOComponent(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {}
            this.onChangeHandler = this.onChangeHandler.bind(this);
        }

        onChangeHandler(key, val) {
            // console.log(key, val);
            this.setState({
                [key]: val
            })
        }

        render() {
            return <Comp {...this.props} onChangeHandler={this.onChangeHandler} state={this.state}></Comp>
        }
    }
}