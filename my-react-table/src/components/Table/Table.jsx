import React, { useState, useMemo } from "react";
import { useAppSelector } from "../../hooks/useStore";
import { useStoreActions } from "../../hooks/useStoreActions";
import { PencilIcon, TrashIcon } from "../Icons/Icons";
import "./Table.css";

function capitalize(str = "") {
  const firstChar = str.charAt(0).toUpperCase();
  const rest = str.slice(1);
  return firstChar + rest;
}

export default function Table({ openModal, onEditData }) {
  const projects = useAppSelector((state) => state.projects);
  const { removeProject } = useStoreActions();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [searchTerm, setSearchTerm] = useState("");

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

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleEditClick = (id) => {
    openModal();
    const data = projects.find((item) => item.id === id);
    onEditData(data);
  };

  const handleDelete = (id) => {
    removeProject(id);
    alert("Project has been deleted");
  };

  // --------------------------

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const pageOptions = [5, 10, 20]; 
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredProjects.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  
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
        <thead>
          <tr>
            <th onClick={() => requestSort("project")}>
              Project
              {sortConfig.key === "project" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                </span>
              )}
            </th>
            <th onClick={() => requestSort("description")} className="expand">
              Description
              {sortConfig.key === "description" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                </span>
              )}
            </th>
            <th onClick={() => requestSort("status")}>
              Status
              {sortConfig.key === "status" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                </span>
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project) => (
            <tr key={project.id}>
              <td>{project.project}</td>
              <td>{project.description}</td>
              <td>
                <span className={`label label-${project.status}`}>
                  {capitalize(project.status)}
                </span>
              </td>
              <td>
                <span className="actions">
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="btn btn-delete"
                  >
                    <TrashIcon />
                  </button>
                  <button
                    onClick={() => handleEditClick(project.id)}
                    className="btn btn-edit"
                  >
                    <PencilIcon />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
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
      </table>
    </div>
  );
}
