import { useSelector } from "react-redux";
import "./App.css";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

function App() {
  const data = useSelector((state) => state.list.list);
  return (
    <div className="App">
      <Table data={data} />
      <Form />
    </div>
  );
}

export default App;
