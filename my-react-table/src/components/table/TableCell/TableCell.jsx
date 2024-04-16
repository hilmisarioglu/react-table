import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TableCell.css";
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
  const [hover, setHover] = useState(false);

  const toggleEdit = () => {
    setIsCurrentlyEdited(true);
    setHover(true);
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
  }, [content]);

  return (
    <td
      style={{ width }}
      className="table-cell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isCurrentlyEdited ? (
        <input
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="table-content">
          <span className="table-content-text">{content}</span>
          {hover && isEditable && (
            <span className="edit-icon" onClick={toggleEdit}>
              <PencilIcon />
            </span>
          )}
        </div>
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
