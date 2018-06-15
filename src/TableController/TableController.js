import React, { Component } from 'react';

import {table1, table2} from '../Table/TestData.js';
import Table from '../Table/Table.js';

class TableController extends Component {
  constructor(props) {
    super(props);

    this.state = {tableData: table1};

    this.setTableData1 = this.setTableData1.bind(this);
    this.setTableData2 = this.setTableData2.bind(this);
  }

  setTableData1() {
    this.setState({tableData: table1});
  }

  setTableData2() {
    this.setState({tableData: table2});
  }

  render() {
    return (
      <div className="row">
        <div className='col-md-12'>
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
