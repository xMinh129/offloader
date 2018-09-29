import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import HomePage from './views/HomePage';
import PassengerList from './views/PassengerList';


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.updateState = this.updateState.bind(this);
        this.updateStateAndSubmit = this.updateStateAndSubmit.bind(this);
    }

    updateState(newState) {
        this.setState(newState);
    }

    updateStateAndSubmit(newState, callback) {
        // Submit Registrant's info here in the call back
        // State does not immediately update. So call in this setState function.
        this.setState(newState, () => {
            console.log(this.state);
            callback();
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {/*<header className="App-header">*/}
                        {/*/!*<img src={logo} alt="logo" style={{height: '80px'}}/>*!/*/}
                    {/*</header>*/}

                    <Route exact path="/" render={() => <HomePage updateStep={this.updateState} />} />
                    <Route path="/1" render={() => <PassengerList
                        updateStep={this.updateState}
                        newState={this.state}/>} />
                </div>
            </Router>
        );
    }
}

export default App;
