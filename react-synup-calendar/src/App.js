import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Datepicker from './components/Datepicker';




class App extends Component {
  render() {
    return (
      <div>
      <div className="w-25 py-5 my-5 mx-auto">
        <Datepicker   />
      </div>
      </div>
    );
  }
}

export default App;
