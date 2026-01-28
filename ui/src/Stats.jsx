export default function Stats({state}){
    return (
        <div style={{marginTop: "10px"}}>
            <div>Tick : {state.tick}</div>
            <div>Queue Length : {state.queuelength}</div>
            <div>Max Queue : {state.maxQueueLength}</div>
            <div>Cars Exited : {state.carsExited}</div>
            <div>Avg Time in System : {state.avgTimeInSystem} </div>
            <div>
                Congestion : {" "}
                {state.congestionDetected ? "YES" : "No"}
            </div>
        </div>
    );
}
