import React, { useState, useEffect, useRef, forwardRef } from "react";

const initialData = (rows, columns) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => "")
  );
};

const InputField = forwardRef(({ value, readOnly, onChange }, ref) => (
  <div style={{ position: 'relative' }}>
    <input
      ref={ref}
      type="text"
      value={value}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
      style={{
        border: 'none',
        padding: '8px',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: readOnly ? '#f4f4f4' : '#fff',
      }}
    />
  </div>
));

const TableCell = forwardRef(({ cell, active, rowIndex, colIndex, handleInputChange }, ref) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) {
      inputRef.current.focus();
    }
  }, [active]);

  return (
    <td
      ref={ref}
      style={{
        padding: 0,
        border: "1px solid #ddd",
        background: active ? "#eef" : "#fff",
      }}
    >
      <InputField
        ref={inputRef}
        value={cell}
        readOnly={false}
        onChange={(value) => handleInputChange(value, rowIndex, colIndex)}
      />
    </td>
  );
});

const TableHeadCell = forwardRef(({ cell, handleHeaderClick }, ref) => {
  const thRef = useRef(null);

  useEffect(() => {
    thRef.current.focus();
  }, []);

  return (
    <th
      ref={ref}
      style={{
        padding: 0,
        border: "1px solid #ddd",
        background: "#f0f0f0",
        cursor: "pointer",
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleHeaderClick();
        }
      }}
    >
      <InputField
        ref={thRef}
        value={cell}
        readOnly
        style={{
          border: "none",
          padding: "8px",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </th>
  );
});

const TableRow = ({ rowData, rowIndex, activeCell, handleInputChange }) => (
  <tr>
    {rowData.map((cell, colIndex) => (
      <TableCell
        key={colIndex}
        cell={cell}
        active={rowIndex === activeCell.row && colIndex === activeCell.col}
        rowIndex={rowIndex}
        colIndex={colIndex}
        handleInputChange={handleInputChange}
      />
    ))}
  </tr>
);

const Spreadsheet = ({ rows = 8, columns = 10 }) => {
  const [data, setData] = useState(() => initialData(rows, columns));
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });

  const handleInputChange = (value, rowIndex, colIndex) => {
    const newData = data.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        return row.map((cell, cIdx) => (cIdx === colIndex ? value : cell));
      }
      return row;
    });
    setData(newData);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    let { row, col } = activeCell;

    if (key === "Enter") {
      e.preventDefault();
      console.log(`Entered at row ${row}, column ${col}`);
    } else if (key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        col = col - 1 < 0 ? columns - 1 : col - 1;
      } else {
        col = col + 1 >= columns ? 0 : col + 1;
      }
    } else if (key === "ArrowUp") {
      row = Math.max(row - 1, 0);
    } else if (key === "ArrowDown") {
      row = Math.min(row + 1, rows - 1);
    } else if (key === "ArrowLeft") {
      col = Math.max(col - 1, 0);
    } else if (key === "ArrowRight") {
      col = Math.min(col + 1, columns - 1);
    }

    setActiveCell({ row, col });
  };

  useEffect(() => {
    const cell = document.querySelector(
      `#cell-${activeCell.row}-${activeCell.col}`
    );
    cell?.focus();
  }, [activeCell]);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ border: "1px solid #ccc" }}
    >
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <TableHeadCell
                key={index}
                cell={`Column ${index + 1}`}
                handleHeaderClick={() => console.log(`Clicked on header of column ${index}`)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              rowData={row}
              rowIndex={rowIndex}
              activeCell={activeCell}
              handleInputChange={handleInputChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Spreadsheet;
