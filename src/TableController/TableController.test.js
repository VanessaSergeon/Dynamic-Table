import React from 'react';
import ReactDOM from 'react-dom';
import TableController from './TableController';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableController />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('toggles between data sets', () => {});