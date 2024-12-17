import React from "react";
import ApplicationTable from "./components/GetDataTable"; // Import the Table component

const App = () => {
  return (
    <div style={{ padding: 24, backgroundColor: "#fff" }}>
      <h1>Application List</h1>
      <ApplicationTable />
    </div>
  );
};

export default App;
