import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedColumnIndex: null, // number
      sortDirection: null, // asc or desc
      tableData: this.props.tableData.slice(1)
    };
  }

  getHeaderData() {
    return this.props.tableData[0];
  }

  TableHeader(headerData) {
    return (
      <thead>
        <tr>
          <th>#</th>
          {headerData.map((d, columnIndex) => {
            return (
              <th key={d}>
                {d}
                {this.getSortButton(columnIndex)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  getSortButton(columnIndex) {
    if (this.state.sortedColumnIndex === columnIndex && this.state.sortDirection === 'asc') {
      return (
        <span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort-by-attributes pull-right" aria-hidden="true"></span>
      );
    } else if (this.state.sortedColumnIndex === columnIndex && this.state.sortDirection === 'desc') {
      return (
        <span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort-by-attributes-alt pull-right" aria-hidden="true"></span>
      );
    } else {
      return (
        <span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort pull-right" aria-hidden="true"></span>
      );
    }
  }

  sortColumn(columnIndex) {
    // console.log(columnIndex)

    // if the column index is the same
      // sort direction is asc
      // else reset index and ordering
    if (this.state.sortedColumnIndex === columnIndex) {
      if (this.state.sortDirection === 'asc') {
        this.setState({sortDirection: 'desc', tableData: this.state.tableData.sort(this.sortAlgorithm).reverse()});
      } else if (this.state.sortDirection === 'desc') {
        this.setState({sortDirection: null, sortedColumnIndex: null});
      }
    }

    // if the column index is different
      // sort ascending and set the column index
    if (this.state.sortedColumnIndex !== columnIndex) {
      this.setState({sortDirection: 'asc', sortedColumnIndex: columnIndex, tableData: this.state.tableData.sort(this.sortAlgorithm)});
      // this.setState({sortedColumnIndex: columnIndex});
    }

    // console.log(this.state.sortDirection);
    // console.log(this.state.sortedColumnIndex);
  }

  sortAlgorithm(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
  }

  getTableBodyData() {
    const bodyData = this.props.tableData.slice(1);
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
        <td>{index + 1}</td>
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
          {this.TableBody(this.state.tableData)}
        </table>
      </div>
    );
  }
}

export default Table;
