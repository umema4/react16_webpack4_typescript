import React, { useState, useEffect } from 'react';
import styles from './App.module.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.App}>
      <h1> TypeScript </h1>
      <h2>クリック回数{count}</h2>
      <button type="button" onClick={handleClick}>
        click me
      </button>
    </div>
  );
}

export default App;
