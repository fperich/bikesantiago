import React from 'react';
import ReactDOM from 'react-dom';
import Station from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Station />, div);
  ReactDOM.unmountComponentAtNode(div);
});
