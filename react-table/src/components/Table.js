import { useState } from 'react';
import { useSortableTable } from '../useSortableTable';
import TableBody from './TableBody';
import TableHead from './TableHead';

const Table = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);
  const [searchString, setSearchString] = useState('');

  return (
    <>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <table className="table">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData, searchString}} />
      </table>
    </>
  );
};

export default Table;
