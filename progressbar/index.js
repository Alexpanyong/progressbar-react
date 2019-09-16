import '@babel/polyfill';
// import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Initializer from './Initializer';

const dom = document.getElementById('root');
ReactDOM.render(<Initializer />, dom);
