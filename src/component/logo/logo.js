import React from 'react'
import logoUrl from './logoPic.jpg'
import './logoCss.css'

class Logo extends React.Component {
    render() {
        return (
            <div className={"logo-container"}>
                <img src={logoUrl} alt="logo"/>
            </div>
        )
    }
}

export default Logo