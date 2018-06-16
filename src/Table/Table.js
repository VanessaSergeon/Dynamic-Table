import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortedColumnIndex: null, // number
      sortDirection: null // asc or desc
    };

    // this.getSortButton = this.getSortButton.bind(this);
    // this.sortColumn = this.sortColumn.bind(this);
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
//
    console.log(columnIndex)
    this.setState({sortedColumnIndex: columnIndex});

    // if the colum index is the same
      // sort direction is null
      // sort direction is asc
      // else

    // if the colum index is different
      // sort direction is null
      // sort direction is asc
      // else

    if (this.state.sortDirection === null) {
      this.setState({sortDirection: 'asc'});
    } else if (this.state.sortDirection === 'asc') {
      this.setState({sortDirection: 'desc'});
    } else {
      this.setState({sortDirection: null});
      this.setState({sortedColumnIndex: null});
    }

    console.log(this.state.sortDirection);
    console.log(this.state.sortedColumnIndex);
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
          {this.TableBody(this.getTableBodyData())}
        </table>
      </div>
    );
  }
}

export default Table;
