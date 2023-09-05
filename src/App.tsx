import React from "react";
import "./custom.css";
import PokeTable from "./features/Pokemon/PokeTable";

function App() {
  return (
    <>
      <div className="bg-section bg-page-color text-primary-color h3-typo">
        <div className="h2-typo ">Mini project: PokeAPI</div>
        <PokeTable />
      </div>
    </>
  );
}

export default App;
