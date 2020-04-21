import React, { Component } from 'react';
import styles from './App.module.css';

class App extends Component {
  handleClick = () => {
    console.log('fuga');
  };

  render() {
    return (
      <div className={styles.App}>
        <h1> TypeScript </h1>
        <button type="button" onClick={this.handleClick}>
          click me
        </button>
      </div>
    );
  }
}

export default App;
