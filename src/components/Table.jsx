import './style/Table.css';
import Column from './Column';

function Table(props) {
  const keys = Object.keys(props.colums);

  return (
    <div className="table">
      {keys.map((key, indx) => (
        <Column title={key} rows={props.colums[key]} key={indx} />
      ))}
    </div>
  );
}

export default Table;
