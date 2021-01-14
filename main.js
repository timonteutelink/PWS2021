let population;
let windowManager;
let cars;

let pause = false;

let slider;

function setup() {
    let canvas = createCanvas(1000, 630);

    population = new Population(5, 1);

    cars = [];
    for (let species of population.species) {
        for (let genome of species.genomes) {
            cars.push(new Car(480, 40, 0, genome));
        }
    }

    windowManager = new WindowManager(population.species[0].genomes[0], cars);

    // options
    slider = createSlider(1, 100, 1);

    let pauseButton = createCheckbox('pause', false);
    pauseButton.changed(() => {
        pause = pauseButton.checked();
    });

    let weights = createCheckbox('draw weights', false);
    weights.changed(() => {
        drawWeights = weights.checked();
    });

    let disabled = createCheckbox('draw disabled', false);
    disabled.changed(() => {
        drawDisabled = disabled.checked();
    });

    createButton("next generation").mousePressed(() => {
        population.nextGeneration();
        pause = false;

        cars = [];
        for (let species of population.species) {
            for (let genome of species.genomes) {
                cars.push(new Car(480, 40, 0, genome));
            }
        }
        windowManager.cars = cars;
    });

}

function draw() {
    for (let i = 0; i < slider.value(); i++) {
        if (!pause) {
            background(0);

            let allStopped = true;

            for (let car of cars) {
                if (!car.stopped) {
                    let pos = {
                        x: car.x,
                        y: car.y
                    };
                    let angle = car.rotation + Math.PI / 2; //starting angle

                    let inputs = [];

                    for (let i = 0; i < 5; i++) {
                        let distance = windowManager.track.distance(pos, {
                            x: Math.cos(angle),
                            y: Math.sin(angle)
                        });

                        // inputs.push(distance / 100);
                        inputs.push(100 / distance);

                        angle += Math.PI / 4;
                    }

                    let parameters = car.genome.feedForward(inputs);

                    car.move(2 * (parameters[0] - 0.5), 1);

                    allStopped = false;
                }
            }

            if (allStopped) {
                population.nextGeneration();

                cars = [];
                for (let species of population.species) {
                    for (let genome of species.genomes) {
                        cars.push(new Car(480, 40, 0, genome));
                    }
                }
                windowManager.cars = cars;
            }
            fill(50);
            noStroke();
            rect(genomeWindowOffsetX, genomeWindowOffsetY, genomeWindowWidth, genomeWindowHeight);
            windowManager.draw();
        }
    }
}

function mousePressed() {
    windowManager.mousePressed();
}

function mouseDragged() {
    windowManager.mouseDragged();
}

function mouseReleased() {
    windowManager.mouseReleased();
}

function importGenome(fileName) {
    let information;
    
    information = loadJSON("saved genomes/" + fileName + ".json", function() {
        console.log(information);
        console.log(information.hidden_nodes);
    
        let genome = new Genome(information.inputs, information.outputs);
    
        genome.fitness = information.fitness;
    
        for (let id of information.hidden_nodes) {
            genome.addNode(id);
        }
    
        for (let connection of information.connections) {
            let inputNode = null;
            let outputNode = null;
    
            if (connection.inputId < genome.input_nodes.length + 1) {
                inputLoop: for (let neuron of genome.input_nodes) {
                    if (neuron.id == connection.inputId) {
                        inputNode = neuron;
                        break inputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of genome.hidden_nodes) {
                    if (neuron.id == connection.inputId) {
                        inputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }
    
            if (connection.outputId < genome.input_nodes.length + genome.output_nodes.length + 1) {
                outputLoop: for (let neuron of genome.output_nodes) {
                    if (neuron.id == connection.outputId) {
                        outputNode = neuron;
                        break outputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of genome.hidden_nodes) {
                    if (neuron.id == connection.outputId) {
                        outputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }
    
            genome.addConnection(inputNode, outputNode, connection.weight, connection.innovation).enabled = connection.enabled;
        }
    
        console.log("genome: " + genome);
    });
}