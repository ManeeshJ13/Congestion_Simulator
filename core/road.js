//configuration
const road_length = 10; //no of slots
const total_ticks = 30; //how long to run
const arrival_every = 1; //entry rate of cars

//state
let road = new Array(road_length).fill(0);
let tick = 0;
let carsExited = 0;

//printing the road
function printRoad() {
    const visual = road.map(cell => (cell===1 ? "C":".")).join(" ");
    console.log(`Tick ${tick}:${visual}`);
}

//one simulation step
function step() {
    tick++;

    //move cars forward
    for (let i = road_length-1; i>=0; i--) {
        if (road[i] === 1 && road[i+1] === 0) {
            road[i+1] = 1;
            road[i] = 0;
        } 
    }

    //remove the car at end
    if (road[road_length-1] === 1) {
        road[road_length - 1] = 0;
        carsExited++;
    }

    //add new car at start
    if (tick % arrival_every === 0) {
        if (road[0] === 0) {
            road[0] = 1;
        }
    }

    //current state
    printRoad();
}


//running the simulation
console.log("Starting simulation");
printRoad();

for (let i = 0; i < total_ticks; i++) {
    step();
}

console.log("Simulation ended");
console.log("Cars exited:", carsExited);