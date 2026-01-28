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

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>Traffic Simulation</h2>

      <RoadView state={state} />

      <button onClick={nextTick}>Next Tick</button>

      <Stats state={state} />
    </div>
  );
}
