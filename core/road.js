//configuration
const road_length = 10; //no of slots
const total_ticks = 30; //how long to run
const arrival_every = 2; //entry rate of cars
const bottleneck_pos = 5; //index of bottleneck
const bottleneck_rate = 5; //allows 1 car every 5 tick
let bottleneckTimer = 0;
//queue of the amount of objects before the bottleneck
//length shows the amt of congestion 
let queueLengthSum = 0;
let maxQueueLength = 0;

//state
let road = new Array(road_length).fill(null);
let tick = 0;
let nextCarId = 1;

//metrics
let carsExited = 0;
let totalTimeInSystem = 0;


//print road
function printRoad() {
    let output = road.map((cell, idx) => {
        if (idx === bottleneck_pos) return cell ? "X":"|";
        return cell ? "C":".";
    }).join(" ");

    console.log(`Tick ${tick}:${output}`);
}

//one simulation step
function step() {
    tick++;
    bottleneckTimer++;

    const newRoad = new Array(road_length).fill(null);

    for(let i = road_length-1; i >= 0; i--) {
        const car = road[i];
        if(!car) continue;

        //exit condition
        if (i === road_length-1) {
            carsExited++;
            totalTimeInSystem += (tick - car.spawnTick);
            continue;
        }

        //bottleneck
        if (i === bottleneck_pos) {
            if (bottleneckTimer >= bottleneck_rate && road[i+1] === null) {
                newRoad[i+1] = car;
                bottleneckTimer = 0;
            }
            else {
                newRoad[i] = car;
            }
            continue;
        }


        //normal movement
        if (road[i+1] === null) {
            newRoad[i+1] = car;
        }
        else {
            newRoad[i] = car;
        }
    }

    //spawn new car
    if (tick % arrival_every === 0 && newRoad[0] === null) {
        newRoad[0] = {
            id: nextCarId++,
            spawnTick: tick
        };
    }

    //measure queue length
    let queueLength = 0;
    for (let i = 0; i < bottleneck_pos; i++) {
        if (road[i] != null) queueLength++;
    }

    queueLengthSum += queueLength;
    maxQueueLength = Math.max(maxQueueLength, queueLength);

    console.log(`Queue Length :${queueLength}`);

    road = newRoad;
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

console.log("Max queue length:", maxQueueLength);
console.log(
    "Average queue length:",
    (queueLengthSum / total_ticks).toFixed(2)
);

if (carsExited > 0) {
    console.log (
        "Average time in system:",
        (totalTimeInSystem/carsExited).toFixed(2), "ticks"
    );
}