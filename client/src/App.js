import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import logo from './logo.svg';

import './App.css';

class App extends Component {

    constructor () {
        super()
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:5000"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data =>
            this.setState({ response: data }));

    }

    renderData() {
        console.log(this.state.response);
        if(this.state.response <= 1000) {
            return ( <p style={{color: "green"}}>{this.state.response}</p>)
        } else if(this.state.response > 1000 && this.state.response <= 2000) {
            return ( <p style={{color: "yellow"}}>{this.state.response}</p>)
        } else if(this.state.response > 2000) {
            return ( <p style={{color: "red"}}>{this.state.response}</p>)
        }
    }


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Co2 Visualization</h1>
                </header>
                <span>Co2 Value:</span>
                {this.renderData()}
            </div>
        );

    }
}

export default App;