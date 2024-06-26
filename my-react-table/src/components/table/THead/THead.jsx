import PropTypes from "prop-types";
import TableHeaderCell from "../TableHeaderCell/TableHeaderCell";

function THead(props) {
  const {
    columns,
    visibleColumns,
    columnWidths,
    onHeaderClick,
    sortConfig,
    settings,
    areAllSelected,
    handleSelectAllToggle,
  } = props;

  return (
    <thead>
      <tr className='table-row'>
        <th className="thead-th">
          <div className="table-column-header">
            <div>
              <input
                type="checkbox"
                checked={areAllSelected}
                onChange={handleSelectAllToggle}
              />
            </div>
          </div>
        </th>
        {visibleColumns.map((key, i) => {
          const column = columns.find((c) => c.key === key);
          const columnWidth =
            column && columnWidths[key]
              ? columnWidths[key]
              : column
              ? column.width
              : "auto";
          const label = column?.label || "";
          const isSorted = sortConfig?.key === key;

          return (
            <TableHeaderCell
              key={i}
              label={label}
              columnWidth={columnWidth}
              sortConfig={isSorted ? sortConfig : null}
              onHeaderCellClick={() => onHeaderClick(key)}
              showSortArrowIcon={settings.sortableColumns.includes(column.key)}
            />
          );
        })}
      </tr>
    </thead>
  );
}

THead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  columnWidths: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onHeaderClick: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["ascending", "descending", ""]),
  }),
  settings: PropTypes.object,
  areAllSelected: PropTypes.bool,
  handleSelectAllToggle: PropTypes.func,
};

export default THead;
