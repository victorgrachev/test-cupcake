import './style/Column.css';
import { useState } from 'react';

function Column(props) {
  //   const [rows, setRows] = useState(props.rows);

  return (
    <div className="column" style={props.style}>
      {props.rows.map((row, indx) => (
        <div className="row" key={indx}>
          <span>{row}</span>
        </div>
      ))}
    </div>
  );
}

export default Column;
