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
      tableData: this.props.tableData.slice(1),
      filters: {},
      filterValue: undefined
    };

    this.sortAlgorithm = this.sortAlgorithm.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    // this.testIfHighlightingByRefWorks = this.testIfHighlightingByRefWorks.bind(this);
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
                {this.getFilterButton(columnIndex)}
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
   * @param {number | null} columnIndexFilter - the column index that is currently being filtered by.
   * @return - the html of the table header filter icon button.
   */
   getFilterButton(columnIndex) {
    if (this.getColumnType(columnIndex) === 'string') {
      return (
        <div>
          <input value={this.state.filterValue} onChange={this.updateInputValue} type="text" className="form-control" placeholder="Text"></input>
          <div className="btn-group pull-right">
            <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue, 'matches')}>Matches</a></li>
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue, 'contains')}>Contains</a></li>
            </ul>
          </div>
        </div>
      );
    } 
  }

  /**
   * @param {event} e - event when input changes.
   */
  updateInputValue(e) {
    this.setState({filterValue: e.target.value})
  }

  /**
   * @param {number} columnIndex - column where filter should be applied.
   * @return {string} - value type.
   */
  getColumnType(columnIndex) {
    return typeof this.state.tableData[0][columnIndex];
  }

  /**
   * select cells to be filtered.
   * @param {number} columnIndex - column where filter should be applied.
   * @param {string | number} value - value to filter by.
   * @param {string} filterType - type of filter to apply to column.
   */
  filterColumn(columnIndex, value, filterType) {
    console.log('filter was chosen')
    let listOfColumnCells = [];

    for (var i = 0; i < this.state.tableData.length; i++) {
      let cellLocation = `coord${columnIndex}and${i}`;
      // let cellLocation = [columnIndex, i];
      let cellValue = this.state.tableData[i][columnIndex];

      listOfColumnCells.push({value: cellValue, location: cellLocation});
    }

    const filterMatches = listOfColumnCells.filter(cell => cell.value.includes(value)); // TODO: filtertype needs to be dynamic

    console.log('listOfColumnCells', listOfColumnCells)
    console.log('filterMatches', filterMatches)
    this.highlightFilteredCells(filterMatches);
  }

  /**
   * highlight cells by their ref coordinates.
   * @param {array} filterMatches - array of cells to be highlighted.
   */
  highlightFilteredCells(filterMatches) {
    for (var i = 0; i < filterMatches.length; i++) {
      const domNode = this.refs[filterMatches[i].location];
      domNode.style.background = 'blue';
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
        {rowData.map(function(data, cellIndex) {
          const cellLocation = `coord${cellIndex}and${index}`;
          // const cellLocation = `coord${index}and${cellIndex}`;
          console.log('cellLocation', cellLocation)
          return (
            <td key={data} ref={cellLocation}>{data}</td>
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
