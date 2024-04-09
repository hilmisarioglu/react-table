import "./Table.css";
import THead from "../THead/THead";
import TBody from "../TBody/TBody";

function Table(props) {
  const {
    visibleColumns,
    sortConfig,
    setSortConfig,
    paginatedData,
    editStatus,
    setEditStatus,
    handleBlurOrEnter,
    editableColumns,
    handleEdit,
  } = props;
  return (
    <table className="editable-table">
      <THead
        visibleColumns={visibleColumns}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
      <TBody
        paginatedData={paginatedData}
        visibleColumns={visibleColumns}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        handleBlurOrEnter={handleBlurOrEnter}
        editableColumns={editableColumns}
        handleEdit={handleEdit}
      />
    </table>
  );
}

export default Table;
