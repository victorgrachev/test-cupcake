import './App.css';
import Table from './components/Table';
import { fetchCurInfo, getCurPairs } from './utils/utils.js';
import { useState, useEffect } from 'react';

function App() {
  const [firstMarket, setFirstMarket] = useState();
  const [secondMarket, setSecondMarket] = useState();
  const [thirdMarket, setThirdMarket] = useState();

  const column = {
    'Pair name/market': [
      { value: 'RUB/CUPCAKE' },
      { value: 'USD/CUPCAKE' },
      { value: 'EUR/CUPCAKE' },
      { value: 'RUB/USD' },
      { value: 'RUB/EUR' },
      { value: 'EUR/USD' },
    ],
    First: firstMarket,
    Second: secondMarket,
    Third: thirdMarket,
  };

  useEffect(() => {
    const loadMarketInfo = async (url, funcUpdateStateMarket) => {
      try {
        const response = await fetchCurInfo(url, false);
        const message = await response.json();
        const curPairs = getCurPairs(
          message.base,
          message.rates,
          column['Pair name/market']
        );
        funcUpdateStateMarket(curPairs);
      } catch {}
    };

    const loadMarketInfoLongPoll = async (url, funcUpdateStateMarket) => {
      try {
        const response = await fetchCurInfo(url, true);

        if (response.status === 502) {
          await loadMarketInfoLongPoll(url, funcUpdateStateMarket);
        } else if (response.status !== 200) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await loadMarketInfoLongPoll(url, funcUpdateStateMarket);
        } else {
          const message = await response.json();
          const curPairs = getCurPairs(
            message.base,
            message.rates,
            column['Pair name/market']
          );
          funcUpdateStateMarket(curPairs);
          await loadMarketInfoLongPoll(url, funcUpdateStateMarket);
        }
      } catch {}
    };
    Promise.all([
      loadMarketInfo('first', setFirstMarket),
      loadMarketInfo('second', setSecondMarket),
      loadMarketInfo('third', setThirdMarket),
    ]).then(() => {
      loadMarketInfoLongPoll('first', setFirstMarket);
      loadMarketInfoLongPoll('second', setSecondMarket);
      loadMarketInfoLongPoll('third', setThirdMarket);
    });
  }, []);

  return (
    <div className="container">
      <h1>Value of currency pairs</h1>
      <Table column={column} />
    </div>
  );
}

export default App;
