export default function RoadView({ state }) {
  const cellSize = 40;

  return (
    <div style={{ display: "flex", marginBottom: "20px" }}>
      {state.road.map((cell, i) => {
        const isBottleneck = i === state.bottleneckIndex;
        const isCar = cell === 1 && !isBottleneck;
        const isCongested = state.congestionDetected;

        return (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              border: "1px solid #555",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isBottleneck ? "#aa3333" : "#222",
            }}
          >
            {isCar && (
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isCongested ? "red" : "cyan",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
