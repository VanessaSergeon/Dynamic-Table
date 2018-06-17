import React, { Component } from 'react';

import {table1, table2} from '../Table/TestData.js';
import Table from '../Table/Table.js';

class TableController extends Component {
  /**
   * this constructor sets the initial state of the TableController componenet
   * and binds functions to the 'this' context of the componenent.
   * @param {object} props - are not used for this component.
   */
  constructor(props) {
    super(props);

    this.state = {tableData: table1};

    this.setTableData1 = this.setTableData1.bind(this);
    this.setTableData2 = this.setTableData2.bind(this);
  }

  /**
   * set the state to table1
   */
  setTableData1() {
    this.setState({tableData: table1});
  }

  /**
   * set the state to table2
   */
  setTableData2() {
    this.setState({tableData: table2});
  }

  /**
   * allow for switching of data set. render the table with the correct data set.
   */
  render() {
    return (
      <div className="row">
        <div className='col-md-12'>
          <span>Select data set: </span>
          <button onClick={this.setTableData1} className='btn btn-default'>Data Set 1</button>
          <button onClick={this.setTableData2} className='btn btn-default'>Data Set 2</button>
        </div>
        <div className='col-md-12'>
          <Table tableData={this.state.tableData} />
        </div>
      </div>
    );
  }
}

export default TableController;
