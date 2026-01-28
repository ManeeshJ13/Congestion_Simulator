//Configurations
const roadLength = 10;
const bottleneckIndex = 5; //position of bottleneck
const arrivalRate = 0.5; //probability a car arrives each tick
const maxTicks = 30; //how long simulation runs
const congestion_threshold = 5; //if queue exists for 5 consecutive ticks, congesiton is declared

//state variables
let road = new Array(roadLength).fill(0);
let tick = 0;

let carsEntered = 0;
let carsExited = 0;

let consecutiveQueueTicks = 0; //how long queue lasts
let congestionDetected = false;

let totalQueueLength = 0;
let maxQueueLength = 0;

let timeInSystem = []; //total time spent before exiting
let carEntryTimes = []; //when each car is entered

//helper functions
function printRoad() {
    let visual = road.map((cell,i) => {
        if (i === bottleneckIndex) return "X";
        return cell === 1 ? "C" : ".";
    }).join(" ");

    console.log(`Tick ${tick}: ${visual}`);
}

function getQueueLength() {
    let count = 0;
    for (let i = bottleneckIndex - 1; i>=0; i--) {
        if (road[i] === 1) count++;
        else break;
    }
    return count;
}

//actual simulation
function step() {
    tick++;

    //moving cars forward
    for (let i = roadLength -1; i >= 0; i--) {
        
        //exit road
        if (i === roadLength - 1 && road[i] === 1){
            road[i] = 0;
            carsExited++;
            let entryTick = carEntryTimes.shift();
            timeInSystem.push(tick - entryTick);
        }

        //normal movement
        else if (
            road[i] === 1 &&
            road[i+1] === 0 &&
            i+1 !== bottleneckIndex
        ) {
            road[i] = 0;
            road[i+1] =1;
        }
    }

    //bottleneck - allows car only every 2 ticks
    if (tick % 2 === 0) {
        if ( 
            road[bottleneckIndex - 1] === 1 && //spot before bottleneck must have object
            road[bottleneckIndex + 1] === 0 //spot after bottleneck must be empty
        ) {
            road[bottleneckIndex - 1] = 0;
            road[bottleneckIndex + 1] = 1;
        }
    }

    //arival of new car
    if (Math.random() < arrivalRate && road[0] === 0) {
        road[0] = 1;
        carsEntered++;
        carEntryTimes.push(tick);
    }


    //metrics
    printRoad();

    const queueLength = getQueueLength();
    console.log(`Queue Length: ${queueLength}`);

    totalQueueLength += queueLength;
    maxQueueLength = Math.max (maxQueueLength, queueLength);

    if (queueLength > 0 ) {
        consecutiveQueueTicks++;
    }
    else {
        consecutiveQueueTicks = 0;
    }

    if (
        consecutiveQueueTicks >= congestion_threshold &&
        !congestionDetected
    ) {
        congestionDetected = true;
        console.log(`Congestion detected at tick ${tick}`);
    }
}


//running the simulation
console.log("Starting Simulation");
while ( tick < maxTicks) {
    step();
}

console.log("Simulation Ended");
console.log(`Cars Exited: ${carsExited}`);
console.log(`Max Queue length: ${maxQueueLength}`);
console.log(
    `Average Queue Length: ${(totalQueueLength/maxTicks).toFixed(2)}`
);

if (timeInSystem.length > 0) {
    const avgTime = timeInSystem.reduce((a,b) => a+b, 0)/timeInSystem.length;
    console.log(
        `Average time in System: ${avgTime.toFixed(2)} ticks`
    );
}
else {
    console.log("Average time in system: N/A");
}