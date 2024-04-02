import { useEffect, useState } from "react";
import "./Table.css";

const HeaderCell = ({ column, sorting, sortTable }) => {
  const isDescSorting = sorting.column === column && sorting.order === "desc";
  const isAscSorting = sorting.column === column && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";
  return (
    <th
      key={column}
      className="users-table-cell"
      onClick={() => sortTable({ column, order: futureSortingOrder })}
    >
      {column}
      {isDescSorting && <span>▼</span>}
      {isAscSorting && <span>▲</span>}
    </th>
  );
};

const Header = ({ columns, sorting, sortTable }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <HeaderCell
            column={column}
            sorting={sorting}
            key={column}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  );
};

const Content = ({ entries, columns }) => {
  return (
    <tbody>
      {entries.map((entry) => (
        <tr key={entry.id}>
          {columns.map((column) => (
            <td key={column} className="users-table-cell">
              {entry[column]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const SearchBar = ({ searchTable }) => {
  const [searchValue, setSearchValue] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    searchTable(searchValue);
  };
  return (
    <div className="search-bar">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </div>
  );
};

const Table = () => {
  const [users, setUsers] = useState([]);
  const [sorting, setSorting] = useState({ column: "id", order: "asc" });
  const [searchValue, setSearchValue] = useState("");
  const columns = ["id", "full_name", "email", "gender"];
  const sortTable = (newSorting) => {
    setSorting(newSorting);
  };
  const searchTable = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  useEffect(() => {
    const users = [
      {
        id: 1,
        full_name: "Wendall Gripton",
        email: "wg@creative.org",
        gender: "Male"
      },
      {
        id: 2,
        full_name: "Hilmi",
        email: "hs@creative.org",
        gender: "Male"
      },
      {
        id: 3,
        full_name: "Stefan",
        email: "sm@creative.org",
        gender: "Male"
      },
    ];
    setUsers(users);
  }, [sorting, searchValue]);

  return (
    <div>
      <SearchBar searchTable={searchTable} />
      <table className="users-table">
        <Header columns={columns} sorting={sorting} sortTable={sortTable} />
        <Content entries={users} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
