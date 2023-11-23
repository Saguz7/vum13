import React from 'react';
import Button from './Button';

function Table({ columns, data }) {
  return (
    <div className="table-responsive table-container">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                style={{ width: column.style }}
                className={column.hideOnSmall ? 'd-none d-sm-table-cell' : ''}
              >
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
                    <Button
                      text={cell.contenido}
                      customStyle={{ width: '80px' }}
                      className="btn-sm" // Agrega clase btn-sm para botones responsivos
                    />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;