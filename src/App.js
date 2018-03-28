import React from 'react'
import {connect} from 'react-redux'
import {addGUN, removeGUN, addGunAsync} from "./index.redux";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            number: 10
        }
    }

    isShow(res) {
        console.log(res)
    }

    render() {
        const num = this.props.num;
        return (
            <div>
                <h1>现在有机枪{num}</h1>
                <button onClick={this.props.addGUN}>申请武器</button>
                <button onClick={this.props.removeGUN}>减少武器</button>
                <button onClick={this.props.addGunAsync}>过一会再给</button>
                <button onClick={() => {
                    this.isShow(this.props)
                }}>过一会再给
                </button>
            </div>
        )
    }

}

const mapStatetoProps = (state) => {
    return {num: state}
};
const actionCreators = {addGUN, removeGUN, addGunAsync};
App = connect(mapStatetoProps, actionCreators)(App);
export default App