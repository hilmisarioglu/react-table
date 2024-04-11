// import React, { useState, useMemo } from "react";
// import "./App.css";
// import Table from "./table/Table/Table";
// import SearchInput from "./components/SearchInput";
// import Dropdown from "./components/Dropdown";
// import MultiSelectDropdown from "./components/MultiSelectDropdown";
// import Pagination from "./components/Pagination";

// function App() {
//   const [data, setData] = useState([
//     { id: 1, firstName: "A", lastName: "A", age: 25 },
//     { id: 2, firstName: "B", lastName: "B", age: 30 },
//     { id: 3, firstName: "C", lastName: "C", age: 22 },
//     { id: 4, firstName: "D", lastName: "D", age: 28 },
//     { id: 5, firstName: "E", lastName: "E", age: 24 },
//     { id: 6, firstName: "F", lastName: "F", age: 26 },
//     { id: 7, firstName: "G", lastName: "G", age: 27 },
//     { id: 8, firstName: "H", lastName: "H", age: 23 },
//     { id: 9, firstName: "I", lastName: "I", age: 29 },
//     { id: 10, firstName: "J", lastName: "J", age: 31 },
//     { id: 11, firstName: "K", lastName: "K", age: 32 },
//     { id: 12, firstName: "L", lastName: "L", age: 33 },
//     { id: 13, firstName: "M", lastName: "M", age: 34 },
//     { id: 14, firstName: "N", lastName: "N", age: 35 },
//     { id: 15, firstName: "O", lastName: "O", age: 36 },
//     { id: 16, firstName: "P", lastName: "P", age: 37 },
//     { id: 17, firstName: "Q", lastName: "Q", age: 38 },
//     { id: 18, firstName: "R", lastName: "R", age: 39 },
//     { id: 19, firstName: "S", lastName: "S", age: 40 },
//     { id: 20, firstName: "T", lastName: "T", age: 41 },
//     { id: 21, firstName: "U", lastName: "U", age: 42 },
//     { id: 22, firstName: "V", lastName: "V", age: 43 },
//     { id: 23, firstName: "W", lastName: "W", age: 44 },
//     { id: 24, firstName: "X", lastName: "X", age: 45 },
//     { id: 25, firstName: "Y", lastName: "Y", age: 46 },
//     { id: 26, firstName: "Z", lastName: "Z", age: 47 },
//   ]);
//   const [editStatus, setEditStatus] = useState({
//     rowKey: null,
//     columnKey: null,
//     value: "",
//   });
//   const [filterText, setFilterText] = useState("");
//   const [pageSize, setPageSize] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState(null);
//   const [visibleColumns, setVisibleColumns] = useState([
//     "firstName",
//     "lastName",
//     "age",
//   ]);
//   const [isActive, setIsActive] = useState(false);

//   const filteredData = useMemo(() => {
//     return data.filter((row) =>
//       visibleColumns.some((column) =>
//         row[column].toString().toLowerCase().includes(filterText.toLowerCase())
//       )
//     );
//   }, [data, filterText, visibleColumns]);

//   const sortedData = useMemo(() => {
//     if (!sortConfig) return filteredData;
//     return [...filteredData].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key])
//         return sortConfig.direction === "ascending" ? -1 : 1;
//       if (a[sortConfig.key] > b[sortConfig.key])
//         return sortConfig.direction === "ascending" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, sortConfig]);

//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;
//     return sortedData.slice(startIndex, startIndex + pageSize);
//   }, [sortedData, currentPage, pageSize]);

//   const handleEdit = (rowIndex, columnKey, value) => {
//     setEditStatus({ rowKey: rowIndex, columnKey, value });
//   };

//   const saveEdit = (rowIndex, columnKey, newValue) => {
//     const newData = [...data];
//     newData[rowIndex][columnKey] = newValue;
//     setData(newData);
//     setEditStatus({ rowKey: null, columnKey: null, value: "" });
//   };

//   const handleBlurOrEnter = (e, rowIndex, columnKey) => {
//     if (e.type === "blur" || e.key === "Enter") {
//       saveEdit(rowIndex, columnKey, e.target.value);
//     }
//   };

//   return (
//     <div>
//       <SearchInput
//         type={"text"}
//         placeholder={"Search..."}
//         value={filterText}
//         onChange={(e) => setFilterText(e.target.value)}
//       />
//       <Dropdown
//         value={pageSize}
//         onChange={(e) => setPageSize(Number(e.target.value))}
//         mappedArray={[5, 10, 20]}
//       />
//       <MultiSelectDropdown
//         isActive={isActive}
//         onClick={() => setIsActive(!isActive)}
//         label={"Select Column"}
//         mappedArray={["firstName", "lastName", "age"]}
//         visibleColumns={visibleColumns}
//         setVisibleColumns={setVisibleColumns}
//       />
//       <Table
//         visibleColumns={visibleColumns}
//         sortConfig={sortConfig}
//         setSortConfig={setSortConfig}
//         paginatedData={paginatedData}
//         editStatus={editStatus}
//         setEditStatus={setEditStatus}
//         handleBlurOrEnter={handleBlurOrEnter}
//         editableColumns={["firstName", "lastName", "age"]}
//         handleEdit={handleEdit}
//       />
//       <Pagination
//         sortedData={sortedData}
//         pageSize={pageSize}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//   );
// }

// export default App;

import { Table, Form } from "./components";
import { PlusIcon } from "./components/Icons/Icons";
import { useData } from "./hooks/useData";
import { useAppSelector } from "./hooks/useStore";

export default function App() {
  const {
    handleOpenModal,
    handleEditData,
    handleDelete,
    FormEditData,
    onSubmit,
    isModalOpen,
    handleCloseModal,
  } = useData();
  const projects = useAppSelector((state) => state.projects);
  return (
    <div className="App">
      <Table
        openModal={handleOpenModal}
        closeModal={handleCloseModal}
        onEditData={handleEditData}
        onDeleteData={handleDelete}
        tableData={projects}
      />
      <button onClick={handleOpenModal} className="btn btn-primary">
        <PlusIcon />
        Create
      </button>
      {isModalOpen && (
        <Form
          closeModal={handleCloseModal}
          dataToEdit={FormEditData}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}
