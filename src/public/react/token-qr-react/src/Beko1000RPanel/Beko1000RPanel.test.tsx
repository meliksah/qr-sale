import React from 'react';
import ReactDOM from 'react-dom';
import App from './Beko1000RPanel';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
