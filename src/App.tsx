// src/App.tsx

import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Clock />
      </div>
    );
  }
}
