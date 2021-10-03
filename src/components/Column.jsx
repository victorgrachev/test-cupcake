import './style/Column.css';

function Column({ title, rows = [] }) {
  return (
    <div className="column">
      <div className="row">
        <span>{title}</span>
      </div>
      {rows.map((row, indx) => (
        <div className={`row ${row.select ? 'selected' : ''}`} key={indx}>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export default Column;
