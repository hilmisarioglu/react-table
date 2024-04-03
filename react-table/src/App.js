import Table from "./components/Table/Table";
import tableData1 from "./tableData1.json";

let columns = Object.keys(tableData1[0]).map((element) => ({
  label: element,
  accessor: element,
  sortable: true,
}));

const App = () => {
  return (
    <div className="table_container">
      <Table data={tableData1} columns={columns} />
    </div>
  );
};

export default App;
