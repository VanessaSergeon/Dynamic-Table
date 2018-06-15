import React, { Component } from 'react';

class Table extends Component {
  // constructor(props) {
  //   super(props);
  // }

  getHeaderData() {
    return this.props.tableData[0];
  }

  TableHeader(headerData) {
    return (
      <thead>
        <tr>
          {headerData.map(function(d) {
            return <th key={d}>{d}</th>
          })}
        </tr>
      </thead>
    );
  }

  getTableBodyData() {
    const bodyData = this.props.tableData.slice(1);
    // const bodyData = table2.slice(1);
    return bodyData;
  }

  TableBody(bodyData) {
    return (
      <tbody>
        {bodyData.map((row, index) => {
          return this.TableBodyRow(row, index)
        })}
      </tbody>
    );
  }

  TableBodyRow(rowData, index) {
    return (
      <tr key={index}>
        {rowData.map(function(data) {
          return (
            <td key={data}>{data}</td>
          );
        })}
      </tr>
    );
  }

  render() {
    return (
      <div className="row">
        <table className='table table-bordered'>
          {this.TableHeader(this.getHeaderData())}
          {this.TableBody(this.getTableBodyData())}
        </table>
      </div>
    );
  }
}

export default Table;
