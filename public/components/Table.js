import React from 'react';
import Button from './Button';

function Table({ columns, data }) {
  return (
    <div>
      <div className="table-responsive table-container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" style={{ width: column.style }}>
                  {column.contenido}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    style={{ textAlign: cell.align || 'left' }}
                  >
                    {cell.tipo === 'texto' ? (
                      cell.contenido
                    ) : cell.tipo === 'boton' ? (

                      
                      <Button text={cell.contenido} customStyle={{ width: '80px'}} />
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;