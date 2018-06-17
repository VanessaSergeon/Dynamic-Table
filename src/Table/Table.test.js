import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import {table1, table2} from './TestData.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table tableData={table1}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the table header', () => {});

it('renders the table body', () => {});

it('numbers the table body rows', () => {});

it('sorts the table by column', () => {});

it('changes sort direction', () => {});