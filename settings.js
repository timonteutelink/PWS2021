// car settings
const size = 4;//5;
const max_speed = 2;
const max_rotationSpeed = 0.03;//0.02;

// algorithm settings
const nodeMutationChance = 0.03;
const linkMutationChance = 0.05;

const weightMutationChance = 0.8;
const weightEditChance = 0.9;

const enableConnectionChance = 0.25;

const populationSize = 150;

//change constants cus weights are important
const c1 = 1.0;
const c2 = 1.0;
const c3 = 0.4;//3.0;


const deltaT = 3.0;

const mutationOnlyChance = 0.25;

// draw genome settings
const neuron_size = 13;

const genomeWindowWidth = 350;
const genomeWindowHeight = 250;
const genomeWindowOffsetX = 350;
const genomeWindowOffsetY = 170;

let drawWeights = false;
let drawDisabled = false;

let global_innovation = 1;
let global_nodeInnovation = 1;
