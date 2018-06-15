import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Table from './Table/Table.js';

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1>Genesis Homework Assignment</h1>

      <div className="jumbotron">
        <Table />
      </div>

    </div>
    );
  }
}

export default App;
