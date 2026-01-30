import { useState } from "react";
import { createEngine } from "../../core/road";
import RoadView from "./RoadView";
import Stats from "./Stats";

const engine = createEngine();

export default function App() {
  const [state, setState] = useState(engine.getState());

  function nextTick() {
    engine.step();
    setState(engine.getState());
  }

  // Add reset function
  function resetSimulation() {
    engine.reset();  // Call the reset function from engine
    setState(engine.getState());  // Update state with fresh simulation
  }

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Traffic Simulation</h2>

      <RoadView state={state} />

      {/* Add Reset button next to Next Tick button */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={nextTick} style={{ marginRight: "10px" }}>
          Next Tick
        </button>
        <button onClick={resetSimulation} style={{ backgroundColor: "#ff4444", color: "white" }}>
          Reset Simulation
        </button>
      </div>

      <Stats state={state} />
    </div>
  );
}