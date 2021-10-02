import './App.css';
import Table from './components/Table';
import { fetchCurPair } from './utils/utils.js';
import { useState, useEffect } from 'react';

function App() {
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();

  const colums = {
    'Pair name/market': [
      'RUB/CUPCAKE',
      'USD/CUPCAKE',
      'EUR/CUPCAKE',
      'RUB/USD',
      'RUB/EUR',
      'EUR/USD',
    ],
    First: first,
    Second: second,
    Third: third,
  };

  const load = async (url) => {
    Promise.all([
      fetchCurPair(`first${url ? '/' + url : ''}`, colums['Pair name/market']),
      fetchCurPair(`second${url ? '/' + url : ''}`, colums['Pair name/market']),
      fetchCurPair(`third${url ? '/' + url : ''}`, colums['Pair name/market']),
    ]).then((res) => {
      res.forEach((r, indx) => {
        if (indx === 0) {
          setFirst(r);
        } else if (indx === 1) {
          setSecond(r);
        } else if (indx === 2) {
          setThird(r);
        }
      });
    });
  };

  useEffect(() => {
    let interval;
    load().then(() => {
      setInterval(() => load('poll'));
    });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Value of currency pairs</h1>
      <Table colums={colums} />
    </div>
  );
}

export default App;
