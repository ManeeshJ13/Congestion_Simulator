//configuration
const road_length = 10; //no of slots
const total_ticks = 30; //how long to run
const arrival_every = 10; //entry rate of cars

//state
let road = new Array(road_length).fill(null);
let tick = 0;
let nextCarId = 1;

//metrics
let carsExited = 0;
let totalTimeInSystem = 0;

//print road
function printRoad() {
    const visual = road
    .map(cell => (cell? "C" : "."))
    .join(" ");
    console.log(`Tick ${tick}:${visual}`);
}

//one simulation step
function step() {
    tick++;

    //move cars forward
    for (let i = road_length - 2; i >= 0 ; i--) {
        if (road[i] && road[i+1] === null) {
            road[i+1] = road[i];
            road[i] = null;
        }
    }

    //remove car at end
    const lastIndex = road_length - 1;
    if (road[lastIndex]) {
        const car = road[lastIndex];
        road[lastIndex] = null;

        carsExited++;
        totalTimeInSystem += (tick - car.spawnTick);
    }

    //add new car to start
    if (tick % arrival_every === 0) {
        if (road[0] === null) {
            road[0] = {
                id: nextCarId++,
                spawnTick:tick
            };
        }
    }

    printRoad();
}

//run simulation
console.log("Starting simulation");
printRoad();

for (let i = 0; i < total_ticks; i++) {
    step();
}

console.log("Simulation ended");
console.log("Cars exited:", carsExited);

if (carsExited > 0) {
    console.log (
        "Average time in system:",
        (totalTimeInSystem/carsExited).toFixed(2), "ticks"
    );
}

