import React, { Component } from 'react';

class Table extends Component {
  /**
   * this constructor sets the initial state of the Table componenet
   * and binds functions to the 'this' context of the componenent.
   * @param {object} props - props contains the table data to be rendered.
   */ 
  constructor(props) {
    super(props);

    this.state = {
      sortedColumnIndex: null, // number
      sortDirection: null, // 'asc' or 'desc'
      tableData: this.props.tableData.slice(1)
    };

    this.sortAlgorithm = this.sortAlgorithm.bind(this);
  }

  /**
   * get the first array of table data that represnts the table header.
   * @return {array} - array of the table columns.
   */ 
  getHeaderData() {
    return this.props.tableData[0];
  }

  /**
   * @param {array} headerData - array of the table columns.
   * @return - the html of the table header.
   */ 
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

  /**
   * @param {number | null} columnIndex - the column index that is currently being sorted by.
   * @return - the html of the table header sort icon button.
   */
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

  /**
   * condidtional logic that determines which direction to sort the table in.
   * @param {number | null} columnIndex - the column index that is currently being sorted by.
   */
  sortColumn(columnIndex) {
    // if the column index is the same
      // sort direction is asc
      // else reset index and ordering
    if (this.state.sortedColumnIndex === columnIndex) {
      if (this.state.sortDirection === 'asc') {
        const reversedData = this.state.tableData.sort(this.sortAlgorithm).reverse();
        this.setState({sortDirection: 'desc', tableData: reversedData});

        // this.setState({sortDirection: 'desc'});
        // this.setState({tableData: this.state.tableData.sort(this.sortAlgorithm).reverse()});
      } else if (this.state.sortDirection === 'desc') {
        this.setState({sortDirection: null, sortedColumnIndex: null, tableData: this.props.tableData.slice(1)});
      }
    }

    // if the column index is different
      // sort ascending and set the column index
    if (this.state.sortedColumnIndex !== columnIndex) {
      this.setState({sortedColumnIndex: columnIndex}, () => {
        const sortedData = this.state.tableData.sort(this.sortAlgorithm);
        this.setState({sortDirection: 'asc', tableData: sortedData});
      })
    }
  }

  /**
   * @param {number | string} a - the item the second item is being sorted against.
   * @param {number | string} b - the item the first item is being sorted against.
   * @return {number} - 1, 0, or -1.
   */
  sortAlgorithm(a, b) {
    if (a[this.state.sortedColumnIndex] < b[this.state.sortedColumnIndex]) return -1;
    if (a[this.state.sortedColumnIndex] > b[this.state.sortedColumnIndex]) return 1;
    return 0;
  }

  /**
   * remove the first array of table data to leave only the body data.
   * @return {array} - array of arrays representing the table body.
   */ 
  getTableBodyData() {
    const bodyData = this.props.tableData.slice(1);
    return bodyData;
  }

  /**
   * @param {array} bodyData - array of arrays representing the table body.
   * @return - the html of the table body.
   */
  TableBody(bodyData) {
    return (
      <tbody>
        {bodyData.map((row, index) => {
          return this.TableBodyRow(row, index)
        })}
      </tbody>
    );
  }

  /**
   * @param {array} rowData - array representing a table row.
   * @param {number} index - number of the table row.
   * @return - the html of a row in the table body.
   */
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

  /**
   * render the componenent when new props are recieved and set the state.
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ tableData: nextProps.tableData.slice(1) });
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
