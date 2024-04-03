function valueContainsSearchString(value, searchString) {
  if (typeof value === 'string') {
    return value.toLowerCase().includes(searchString.toLowerCase());
  } else if (typeof value === 'number') {
    return value.toString().includes(searchString);
  } else {
    return false;
  }
}

const TableBody = ({ tableData, columns, searchString }) => {

  return (
    <tbody>
      {tableData
        .filter((item) =>
          Object.values(item).some((value) =>
            valueContainsSearchString(value, searchString)
          )
        )
        .map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : '——';
                const textAlign = typeof tData === 'number' ? 'right' : 'left';
                return (
                  <td key={accessor} className='users-table-cell' style={{ textAlign }}>
                    <input value={tData} style={{ textAlign }}/>
                    {/* {tData} */}

                  </td>
                );
              })}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TableBody;
