import React, { useState, useMemo } from "react";
import "./Table.css";
import THead from "../THead/THead";
import { useEffect } from "react";
import TBody from "../TBody/TBody";
import TableRow from "../TableRow/TableRow";

function capitalize(str = "") {
  const firstChar = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return firstChar + rest;
}

export default function Table({
  openModal,
  onEditData,
  onDeleteData,
  tableData,
}) {
  const projects = tableData;

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "",
    sortable: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleHeaderClick = (key) => {
    let direction = "ascending";
    let sortable = true;

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "";
      key = null;
    }

    columns.forEach((item) => {
      if (item.key === key) {
        sortable = item.sortable;
      }
    });
    setSortConfig({ key, direction, sortable });
  };

  const sortedProjects = useMemo(() => {
    let sortableProjects = [...projects];
    if (sortConfig.key !== null) {
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
  }, [projects, sortConfig]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(
      (project) =>
        project.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedProjects, searchTerm]);

  const handleEditClick = (id) => {
    openModal();
    const data = projects.find((item) => item.id === id);
    onEditData(data);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columns, setColumns] = useState([]);
  const pageOptions = [5, 10, 20];
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredProjects.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      return [];
    }
    const firstProject = projects[0];
    let objects = Object.keys(firstProject).map((key) => ({
      key: key,
      label: capitalize(key),
      sortable: true,
    }));
    setColumns(objects);
  }, [projects]);

  const columnWidths = {
    project: "40%",
    description: "40%",
    status: "20%",
  };
  const visibleColumns = ["project", "description", "status"];

  if (!projects) {
    return <div>Loading</div>;
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
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          {pageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <THead
          columns={columns}
          visibleColumns={visibleColumns}
          columnWidths={columnWidths}
          onHeaderClick={handleHeaderClick}
          sortConfig={sortConfig}
        />
        <TBody>
          {currentItems.map((project, i) => (
            <TableRow
              key={i}
              rowData={project}
              columns={columns.filter((column) =>
                visibleColumns.includes(column.key)
              )}
              onDeleteData={onDeleteData}
              handleEditClick={handleEditClick}
            />
          ))}
        </TBody>
      </table>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
