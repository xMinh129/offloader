import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Button from './components/CustomButton';
import Registration1 from './views/Registration1';
import Registration2 from './views/Registration2';


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Welcome to NodeFlair Registration Portal.
            Click the button below to start.
        </p>
          <div style={{height:'400px'}}>
                  <Button fill round bsStyle="primary">Enter</Button>
          </div>
          <Registration1/>
          <Registration2/>
        <Footer />
      </div>
    );
  }
}

export default App;
