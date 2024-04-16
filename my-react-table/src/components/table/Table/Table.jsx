import React, { useState, useMemo } from "react";
import "./Table.css";
import THead from "../THead/THead";
import { useEffect } from "react";
import TBody from "../TBody/TBody";
import TableRow from "../TableRow/TableRow";
import { TrashIcon } from "../../Icons/Icons";
import Pagination from "../../pagination/Pagination";
import Dropdown from "../../dropdown/Dropdown";

export default function Table(props) {
  const { openModal, onEditData, onDeleteData, tableData, settings } = props;
  const projects = tableData || [];
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "",
    sortable: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleHeaderClick = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "";
      key = null;
    }
    setSortConfig({ key, direction });
  };

  const sortedObjects = useMemo(() => {
    if (!projects.length) return [];
    let sortableProjects = [...projects];
    if (
      sortConfig.key &&
      settings[0].sortableColumns.includes(sortConfig.key)
    ) {
      sortableProjects.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProjects;
  }, [projects, sortConfig, settings]);

  const filteredObjects = useMemo(() => {
    return sortedObjects.filter((obj) =>
      visibleColumns.some((column) =>
        obj[column].toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedObjects, searchTerm, settings, visibleColumns]);

  const handleEditCellClick = (newValue, id, key) => {
    const data = projects.find((item) => item.id === id);
    const formState = { ...data, [key]: newValue };
    onEditData(formState);
  };

  const handleDeleteSelected = () => {
    onDeleteData(selectedRows);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columns, setColumns] = useState([]);
  const pageOptions = settings?.[0]?.pageOptions || [5, 10, 20];
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredObjects.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredObjects.length / itemsPerPage);

  useEffect(() => {
    if (settings) {
      setColumns(settings[0].columns);
      setVisibleColumns(settings[0].visibleColumns);
    }
  }, [settings]);

  const columnWidths = {
    project: "40%",
    description: "40%",
    status: "20%",
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllToggle = () => {
    if (selectedRows.length === projects.length) {
      setSelectedRows([]);
    } else {
      const newSelection = projects.map((project) => project.id);
      setSelectedRows(newSelection);
    }
  };
  useEffect(() => {
    setSelectedRows([]);
  }, [tableData]);

  if (!projects || projects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          className="input-container"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <THead
          columns={columns}
          visibleColumns={visibleColumns}
          columnWidths={columnWidths}
          onHeaderClick={handleHeaderClick}
          sortConfig={sortConfig}
          settings={settings[0]}
          areAllSelected={selectedRows.length === projects.length}
          handleSelectAllToggle={handleSelectAllToggle}
        />
        <TBody>
          {currentItems.map((item, i) => (
            <TableRow
              key={item.id}
              rowData={item}
              columns={columns.filter((column) =>
                visibleColumns.includes(column.key)
              )}
              onDeleteData={onDeleteData}
              handleEditCellClick={handleEditCellClick}
              settings={settings[0]}
              isSelected={selectedRows.includes(item.id)}
              onRowSelect={handleRowSelect}
            />
          ))}
        </TBody>
      </table>
      <div className="footer-pagination">
        <div className="select-delete-container">
          <span>
            {selectedRows.length} Row
            {!selectedRows.length || selectedRows.length > 1 ? "s " : " "}
            Selected
          </span>{" "}
          <div onClick={handleDeleteSelected}>
            <TrashIcon />
          </div>
        </div>
        <div className="pagination-dropdown-container">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Dropdown
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            pageOptions={pageOptions}
          />
        </div>
      </div>
    </div>
  );
}
