import React, { useState, useEffect } from 'react';
import styles from '../App.module.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.App}>
      <h2>Count{count}</h2>
      <button type="button" onClick={handleClick}>
        click me
      </button>
    </div>
  );
};

export default Counter;
