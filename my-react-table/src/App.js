import logo from "./logo.svg";
import "./App.css";
import EditableTable from "./table/EditableTable";

function App() {
  const data = [
    { id: 1, firstName: "A", lastName: "A", age: 25 },
    { id: 2, firstName: "B", lastName: "B", age: 30 },
    { id: 3, firstName: "C", lastName: "C", age: 22 },
    { id: 4, firstName: "D", lastName: "D", age: 28 },
    { id: 5, firstName: "E", lastName: "E", age: 24 },
    { id: 6, firstName: "F", lastName: "F", age: 26 },
    { id: 7, firstName: "G", lastName: "G", age: 27 },
    { id: 8, firstName: "H", lastName: "H", age: 23 },
    { id: 9, firstName: "I", lastName: "I", age: 29 },
    { id: 10, firstName: "J", lastName: "J", age: 31 },
    { id: 11, firstName: "K", lastName: "K", age: 32 },
    { id: 12, firstName: "L", lastName: "L", age: 33 },
    { id: 13, firstName: "M", lastName: "M", age: 34 },
    { id: 14, firstName: "N", lastName: "N", age: 35 },
    { id: 15, firstName: "O", lastName: "O", age: 36 },
    { id: 16, firstName: "P", lastName: "P", age: 37 },
    { id: 17, firstName: "Q", lastName: "Q", age: 38 },
    { id: 18, firstName: "R", lastName: "R", age: 39 },
    { id: 19, firstName: "S", lastName: "S", age: 40 },
    { id: 20, firstName: "T", lastName: "T", age: 41 },
    { id: 21, firstName: "U", lastName: "U", age: 42 },
    { id: 22, firstName: "V", lastName: "V", age: 43 },
    { id: 23, firstName: "W", lastName: "W", age: 44 },
    { id: 24, firstName: "X", lastName: "X", age: 45 },
    { id: 25, firstName: "Y", lastName: "Y", age: 46 },
    { id: 26, firstName: "Z", lastName: "Z", age: 47 },
  ];
  return (
    <div className="App">
      <EditableTable initialData={data} />
    </div>
  );
}

export default App;
