import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./TableCell.css";
import { PencilIcon } from "../../Icons/Icons";

const TableCell = (props) => {
  const { width, content, rowId, columnKey, onDeleteData, onEditCell } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [hover, setHover] = useState(false);

  const toggleEdit = () => {
    setIsEditable(true);
    setHover(true);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = () => {
    if (editValue !== content) {
      onEditCell(editValue, rowId, columnKey);
    }
    setIsEditable(false);
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
      {isEditable ? (
        <input
          type="text"
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div onClick={toggleEdit}>
          {content}
          {hover && !isEditable && (
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
};

export default TableCell;
