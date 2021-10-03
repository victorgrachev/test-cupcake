import './style/Table.css';
import Column from './Column';

function Table({ column }) {
  const keys = Object.keys(column);
  const markets = keys.filter(
    (key) => key !== 'Pair name/market' && column[key]
  );
  const selectRow = [];

  markets.forEach((marketKey, indexMarket, arrMarketIteration) => {
    column[marketKey].forEach((marketValue, indexMarketValue) => {
      marketValue.select = false;

      const compareValueRow = [marketValue.value];

      arrMarketIteration.forEach((keyMarketIteration) => {
        if (keyMarketIteration !== marketKey) {
          compareValueRow.push(
            column[keyMarketIteration][indexMarketValue].value
          );
        }
      });
      const minRowValue = Math.min(...compareValueRow);

      if (minRowValue === marketValue.value) {
        selectRow.push({ key: marketKey, indx: indexMarketValue });
      }
    });
  });

  selectRow.forEach((value) => {
    column[value.key][value.indx].select = true;
  });

  return (
    <div className="table">
      {keys.map((key, indx) => (
        <Column title={key} rows={column[key]} key={indx} />
      ))}
    </div>
  );
}

export default Table;
