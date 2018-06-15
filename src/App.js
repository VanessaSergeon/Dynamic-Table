import React, { Component } from 'react';

import './App.css';
import TableController from './TableController/TableController.js';

class App extends Component {
  render() {
    return (
      <div className="container">
      <h1>Genesis Homework Assignment</h1>

      <div>
        <TableController />
      </div>

    </div>
    );
  }
}

export default App;
