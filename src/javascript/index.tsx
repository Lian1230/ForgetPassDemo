import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './ForgetPass';

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
