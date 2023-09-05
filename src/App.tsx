import "src/custom.css";
import PokeTable from "src/features/Pokemon/PokeTable";

function App() {
  return (
    <>
      <div className="bg-section bg-page-color">
        <div className="h3-typo  mg-10">Mini project: PokeAPI</div>
        <PokeTable />
      </div>
    </>
  );
}

export default App;
