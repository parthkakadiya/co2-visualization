import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor () {
        super();
        this.state = {
            response: 100,
            endpoint: "http://127.0.0.1:5000"
        };
    }
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint); // for make connection with back-end
        socket.on("FromAPI", data =>
            this.setState({ response: data })); // receive data from back-end serer and assign to state

    }
    renderData() {
        console.log(this.state.response);
        //  condition for color visualization
        if(this.state.response <= 1000) {
            return ( <p style={{color: "green"}}>{this.state.response+"ppm"}</p>)
        } else if(this.state.response > 1000 && this.state.response <= 2000) {
            return ( <p style={{color: "yellow"}}>{this.state.response+"ppm"}</p>)
        } else if(this.state.response > 2000) {
            return ( <p style={{color: "red"}}>{this.state.response+"ppm"}</p>)
        }
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Co2 Visualization</h1>
                </header>
                <span >Co2 Value:</span>
                <span>{this.renderData()}</span>
            </div>
        );

    }
}
export default App;