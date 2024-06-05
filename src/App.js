import "./App.css";
import FilterBar from "./components/FilterBar/FilterBar";
import NavBar from "./components/NavBar/NavBar";
import Pagination from "./components/Pagination/Pagination";
import TableComponent from "./components/TableComponent/TableComponent";

function App() {
  return (
    <div className="container">
      <NavBar />
      <FilterBar />
      <TableComponent />
    </div>
  );
}

export default App;
