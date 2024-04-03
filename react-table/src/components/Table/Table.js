import { useState, useEffect } from "react";
import { useSortableTable } from "../../useSortableTable";
import TableBody from "../TableBody/TableBody";
import TableHead from "../TableHead/TableHead";
import "./Table.css";

const Table = ({ data, columns }) => {
  const [tableData,handleSorting] = useSortableTable(data, columns);
  const [searchString, setSearchString] = useState("");

  return (
    <>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData, searchString, handleSorting }} />
      </table>
    </>
  );
};

export default Table;
