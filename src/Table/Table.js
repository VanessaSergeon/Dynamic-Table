import React, { Component } from 'react';

import './Table.css';

class Table extends Component {
  /**
   * this constructor sets the initial state of the Table componenet
   * and binds functions to the 'this' context of the componenent.
   * @param {object} props - props contains the table data to be rendered.
   */ 
  constructor(props) {
    super(props);

    let filterValues = {};
    for (var i = 0; i < props.tableData.length; i++) {
      filterValues[i] = undefined;
    }

    this.state = {
      sortedColumnIndex: null, // number
      sortDirection: null, // 'asc' or 'desc'
      tableData: this.props.tableData.slice(1),
      filters: [],
      filterValue: filterValues
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
          {headerData.map((columnName, columnIndex) => {
            return (
              <th key={columnName}>
                {columnName}
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
        <div><span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort-by-attributes pull-right" aria-hidden="true"></span></div>
      );
    } else if (this.state.sortedColumnIndex === columnIndex && this.state.sortDirection === 'desc') {
      return (
        <div><span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort-by-attributes-alt pull-right" aria-hidden="true"></span></div>
      );
    } else {
      return (
        <div><span onClick={() => this.sortColumn(columnIndex)} className="glyphicon glyphicon-sort pull-right" aria-hidden="true"></span></div>
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
        <div className="form-inline">
          <input value={this.state.filterValue[columnIndex]} onChange={(e) => this.updateInputValue(columnIndex, e)} type="text" className="form-control" placeholder="Text"></input>
          <div className="btn-group pull-right">
            <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue[columnIndex], 'matches')}>Matches</a></li>
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue[columnIndex], 'contains')}>Contains</a></li>
            </ul>
          </div>
        </div>
      );
    } else if (this.getColumnType(columnIndex) === 'number') {
      return (
        <div>
          <input value={this.state.filterValue[columnIndex]} onChange={(e) => this.updateInputValue(columnIndex, e)} type="text" className="form-control" placeholder="Text"></input>
          <div className="btn-group pull-right">
            <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Filter <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue[columnIndex], 'equals')}>Equals</a></li>
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue[columnIndex], 'greater than')}>Greater than</a></li>
              <li><a onClick={() => this.filterColumn(columnIndex, this.state.filterValue[columnIndex], 'less than')}>Less than</a></li>
            </ul>
          </div>
        </div>
      );
    } 
  }

  /**
   * @param {number} columnIndex - the index of the column filter data is being entered into.
   * @param {event} e - event when input changes.
   */
  updateInputValue(columnIndex, e) {
    const newFilterState = this.state.filterValue;
    newFilterState[columnIndex] = e.target.value
    this.setState(newFilterState)
  }

  /**
   * @param {number} columnIndex - column where filter should be applied.
   * @return {string} - value type.
   */
  getColumnType(columnIndex) {
    return typeof this.state.tableData[0][columnIndex];
  }

  /**
   * select cells to be filtered based on filter type.
   * @param {number} columnIndex - column where filter should be applied.
   * @param {string | number} value - value to filter by.
   * @param {string} filterType - type of filter to apply to column.
   */
  filterColumn(columnIndex, value, filterType) {
    if (value === undefined) {
      alert("Please enter a value to filter by.")
    } else {
      let listOfColumnCells = [];

      for (var i = 0; i < this.state.tableData.length; i++) {
        let cellLocation = `coord${columnIndex}and${i}`;
        // let cellLocation = [columnIndex, i];
        let cellValue = this.state.tableData[i][columnIndex];

        listOfColumnCells.push({value: cellValue, location: cellLocation});
      }

      let filterMatches;
      // TODO: refactor into a switch statement.
      if (filterType === "contains") {
        filterMatches = listOfColumnCells.filter(cell => cell.value.includes(value));
      } else if (filterType === "matches") {
        filterMatches = listOfColumnCells.filter(cell => cell.value === value);
      } else if (filterType === "equals") {
        filterMatches = listOfColumnCells.filter(cell => cell.value == value);
      } else if (filterType === "greater than") {
        filterMatches = listOfColumnCells.filter(cell => cell.value > value);
      } else if (filterType === "less than") {
        filterMatches = listOfColumnCells.filter(cell => cell.value < value);
      }

      const filterConfig = {'columnIndex': columnIndex, 'value': value, 'filterType': filterType, 'filterMatches': filterMatches};
      const newFilterState = this.state.filters;
      newFilterState.push(filterConfig);
      this.setState({filters: newFilterState});

      this.highlightFilteredCells(filterMatches);
    }
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
   * unHighlight cells by their ref coordinates.
   * @param {array} filterMatches - array of cells to be highlighted.
   */
  unHighlightFilteredCells(filterMatches) {
    for (var i = 0; i < filterMatches.length; i++) {
      const domNode = this.refs[filterMatches[i].location];
      domNode.style.background = 'none';
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
        {rowData.map((data, cellIndex) => {
          const cellLocation = `coord${cellIndex}and${index}`;
          const popoverLocation = `${cellLocation}info`;
          return (
            <td key={data} ref={cellLocation}>
              <div
                onMouseEnter={() => this.showCellInfo(popoverLocation)}
                onMouseLeave={() => this.hideCellInfo(popoverLocation)}>
                {data}
                {this.cellInfo(popoverLocation, index)}
              </div>
            </td>
          );
        })}
      </tr>
    );
  }

  cellInfo(popoverLocation, rowIndex) {
    return (
      <div ref={popoverLocation} className="cell-info">
        Row of cell is: {rowIndex + 1}
      </div>
    );
  }

  showCellInfo(popoverLocation) {
    const domNode = this.refs[popoverLocation];
    domNode.style.visibility = 'visible';
  }

  hideCellInfo(popoverLocation) {
    const domNode = this.refs[popoverLocation];
    domNode.style.visibility = 'hidden';
  }

  /**
   * @return - html list of applied filters
   */
  listOfFilters() {
    if (this.state.filters.length) {
      return (
        <div>
          <p>Remove filter</p>
          <div className="list-group">
            {this.state.filters.map((filter, filterIndex) => {
              return (
                <button onClick={() => {this.removeFilter(filterIndex)}} key={filter.value} type="button" className="list-group-item">
                  Column Index: {filter.columnIndex} - Filter Value: {filter.value} - Filter Type: {filter.filterType}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  }

  /**
   * remove a filter.
   */
  removeFilter(filterIndex) {
    this.unHighlightFilteredCells(this.state.filters[filterIndex].filterMatches);
    const newFilerList = this.state.filters;
    newFilerList.splice(filterIndex, 1);
    this.setState({filters: newFilerList});
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
        {this.listOfFilters()}
        <table className='table table-bordered'>
          {this.TableHeader(this.getHeaderData())}
          {this.TableBody(this.state.tableData)}
        </table>
      </div>
    );
  }
}

export default Table;
