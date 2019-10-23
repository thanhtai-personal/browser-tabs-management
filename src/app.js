import React from 'react';
import ReactDOM from 'react-dom';
const title = 'tab-management-lib';
import TabManagerWrapper from './index'

ReactDOM.render(
  TabManagerWrapper(<div>{title}</div>),
  document.getElementById('app')
);