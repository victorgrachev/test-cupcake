import './style/Column.css';

function Column(props) {
  const rows = props.rows ? props.rows : [];
  const title = props.title;

  return (
    <div className="column">
      <div className="row">
        <span>{title}</span>
      </div>
      {rows.map((row, indx) => (
        <div className="row" key={indx}>
          <span>{row}</span>
        </div>
      ))}
    </div>
  );
}

export default Column;
