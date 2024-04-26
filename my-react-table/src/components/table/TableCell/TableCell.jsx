import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { PencilIcon } from "../../Icons/Icons";

const TableCell = (props) => {
  const {
    width,
    content,
    rowId,
    columnKey,
    onDeleteData,
    onEditCell,
    isEditable,
  } = props;
  const [isCurrentlyEdited, setIsCurrentlyEdited] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const inputRef = useRef(null);

  const toggleEdit = () => {
    setIsCurrentlyEdited(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = () => {
    if (editValue !== content) {
      onEditCell(editValue, rowId, columnKey);
    }
    setIsCurrentlyEdited(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  useEffect(() => {
    setEditValue(content);
    if (isCurrentlyEdited) {
      inputRef.current.focus();
    }
  }, [content, isCurrentlyEdited]);

  return (
    <td
      style={{
        width,
        cursor: isEditable ? "text" : "not-allowed", // Conditional cursor style
      }}
      className="table-cell"
      onClick={() => {
        if (isEditable) toggleEdit();
      }}
    >
      {isCurrentlyEdited ? (
        <input
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      ) : (
        <>
          <input
            type="text"
            value={content}
            readOnly={!isEditable}
            className="table-content"
            onKeyDown={(e) => {
              if (isEditable) {
                toggleEdit();
              }
            }}
          />
        </>
      )}
    </td>
  );
};

TableCell.propTypes = {
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnKey: PropTypes.string,
  content: PropTypes.string.isRequired,
  onDeleteData: PropTypes.func,
  onEditCell: PropTypes.func,
  isEditable: PropTypes.bool,
};

export default TableCell;
