import './style/Table.css';
import { useState } from 'react';
import Column from './Column';

function Table(props) {
  const title = [
    'Pair name/market',
    'RUB/CAPCAKE',
    'USD/CAPCAKE',
    'EUR/CAPCAKE',
    'RUB/USD',
    'RUB/EUR',
    'EUR/USD',
  ];
  const arr1 = ['First', 2, 3, 4, 5, 6, 7];
  const arr2 = ['Second', 2, 3, 4, 5, 6, 7];
  const arr3 = ['Third', 2, 3, 4, 5, 6, 7];
  return (
    <div className="table">
      <Column rows={title} style={{ textAlign: 'center' }} />
      <Column rows={arr1} />
      <Column rows={arr2} />
      <Column rows={arr3} />
    </div>
  );
}

export default Table;
