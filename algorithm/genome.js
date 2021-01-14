class Genome {

    constructor(inputs, outputs) {
        this.fitness = Infinity;

        this.input_nodes = [];
        for (let i = 0; i < inputs; i++) {
            let coords;
            if (inputs <= 1)
                coords = {
                    x: 2 * neuron_size + genomeWindowOffsetX,
                    y: genomeWindowHeight / 2 + genomeWindowOffsetY
                };
            else
                coords = {
                    x: 2 * neuron_size + genomeWindowOffsetX,
                    y: (genomeWindowHeight - 2 * neuron_size) * i / (inputs - 1) + neuron_size + genomeWindowOffsetY
                };

            this.input_nodes.push(new Neuron(coords, i + 1));
        }

        this.output_nodes = [];
        for (let i = 0; i < outputs; i++) {
            let coords;
            if (outputs <= 1)
                coords = {
                    x: genomeWindowWidth - 2 * neuron_size + genomeWindowOffsetX,
                    y: genomeWindowHeight / 2 + genomeWindowOffsetY
                };
            else
                coords = {
                    x: genomeWindowWidth - 2 * neuron_size + genomeWindowOffsetX,
                    y: (genomeWindowHeight - 2 * neuron_size) * i / (outputs - 1) + neuron_size + genomeWindowOffsetY
                };

            this.output_nodes.push(new Neuron(coords, inputs + i + 1));
        }

        this.connections = [];
        this.hidden_nodes = [];
    }

    addConnection(input, output, weight, innovation) {
        let connection = new Connection(innovation ? innovation : global_innovation++, input, output, weight);
        output.inputs.push(connection);

        this.connections.push(connection);
        return connection;
    }

    addNode(id) {
        let neuron = new Neuron(null, id ? id : global_nodeInnovation++);
        this.hidden_nodes.push(neuron);
        return neuron;
    }

    mutate() {
        if (Math.random() < weightMutationChance) {
            for (let connection of this.connections) {
                if (Math.random() < weightEditChance) {
                    connection.weight += Math.random() * 0.2 - 0.1;
                } else {
                    connection.weight = randomWeight();
                }
            }
        }

        if (Math.random() < linkMutationChance) {
            let possible_inputs = this.input_nodes.concat(this.hidden_nodes);
            let possible_outputs = this.output_nodes.concat(this.hidden_nodes);

            loop: for (let i = 0; i < 100; i++) { // 100 tries
                var input = possible_inputs[Math.floor(Math.random() * possible_inputs.length)];
                var output = possible_outputs[Math.floor(Math.random() * possible_outputs.length)];

                if (input === output) continue loop;

                for (let connection of output.inputs) { //check for connection
                    if (connection.input === input) {
                        continue loop;
                    }
                }

                currentGenerationConnectionMutations.push({
                    genome: this,
                    input: input,
                    output: output
                });

                break;
            }
        }

        if (Math.random() < nodeMutationChance && this.connections.length > 0) {
            var connection = this.connections[Math.floor(Math.random() * this.connections.length)];

            connection.enabled = false;

            currentGenerationNodeMutations.push({
                genome: this,
                input: connection.input,
                output: connection.output,
                weight: connection.weight
            });
        }
    }

    // optimize later
    crossover(partner) {
        let genepool = {};

        for (let connection of this.connections) {
            genepool[connection.innovation] = {
                connection1: connection
            };
        }

        for (let connection of partner.connections) {
            if (genepool[connection.innovation])
                genepool[connection.innovation].connection2 = connection;
            else
                genepool[connection.innovation] = {
                    connection2: connection
                };
        }

        let childConnections = [];

        let values = Object.values(genepool);

        for (let connections of values) {
            if (connections.connection1 && connections.connection2)
                if (Math.random() < 0.5)
                    childConnections.push(connections.connection1);
                else
                    childConnections.push(connections.connection2);
            else
            if (this.fitness == partner.fitness)
                if (connections.connection1)
                    childConnections.push(connections.connection1);
                else
                    childConnections.push(connections.connection2);
            else if (this.fitness > partner.fitness)
                if (connections.connection1)
                    childConnections.push(connections.connection1);
                else
            if (connections.connection2)
                childConnections.push(connections.connection2);
        }

        let child = new Genome(this.input_nodes.length, this.output_nodes.length);

        for (let connection of childConnections) {
            let inputNode = null;
            let outputNode = null;

            if (connection.input.id < child.input_nodes.length + 1) {
                inputLoop: for (let neuron of child.input_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break inputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of child.hidden_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            if (connection.output.id < child.input_nodes.length + child.output_nodes.length + 1) {
                outputLoop: for (let neuron of child.output_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break outputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of child.hidden_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            if (inputNode == null) {
                inputNode = child.addNode(connection.input.id);
            }

            if (outputNode == null) {
                outputNode = child.addNode(connection.output.id);
            }

            child.addConnection(inputNode, outputNode, connection.weight, connection.innovation).enabled = connection.enabled ? true : Math.random() < enableConnectionChance;
        }

        return child;
    }

    feedForward(inputs) {

        if (this.input_nodes.length != inputs.length)
            return null;

        for (let i = 0; i < inputs.length; i++) {
            this.input_nodes[i].value = inputs[i];
        }

        let outputs = [];

        for (let output of this.output_nodes) {
            outputs.push(output.computeValue());
        }

        for (let neuron of this.input_nodes) {
            neuron.value = Infinity;
        }

        for (let neuron of this.hidden_nodes) {
            neuron.value = Infinity;
        }

        for (let neuron of this.output_nodes) {
            neuron.value = Infinity;
        }

        return outputs;

    }

    draw() {
        for (let neuron of this.input_nodes) {
            neuron.draw();
        }

        for (let neuron of this.hidden_nodes) {
            neuron.draw();
        }

        for (let neuron of this.output_nodes) {
            neuron.draw();
        }

        for (let connection of this.connections) {
            connection.draw();
        }
    }

    copy() {
        let genome = new Genome(this.input_nodes.length, this.output_nodes.length);

        genome.fitness = this.fitness;

        for (let neuron of this.hidden_nodes) {
            genome.addNode(neuron.id);
        }

        for (let connection of this.connections) {
            let inputNode = null;
            let outputNode = null;

            if (connection.input.id < genome.input_nodes.length + 1) {
                inputLoop: for (let neuron of genome.input_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break inputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of genome.hidden_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            if (connection.output.id < genome.input_nodes.length + genome.output_nodes.length + 1) {
                outputLoop: for (let neuron of genome.output_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break outputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of genome.hidden_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            genome.addConnection(inputNode, outputNode, connection.weight, connection.innovation).enabled = connection.enabled;
        }

        return genome;

    }

    generateSavableGenome() {
        let information = {inputs: this.input_nodes.length, outputs: this.output_nodes.length, fitness: this.fitness, hidden_nodes: [], connections: []};

        for (let neuron of this.hidden_nodes) {
            information.hidden_nodes.push(neuron.id);
        }

        for (let connection of this.connections) {
            let inputNode = null;
            let outputNode = null;

            if (connection.input.id < this.input_nodes.length + 1) {
                inputLoop: for (let neuron of this.input_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break inputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of this.hidden_nodes) {
                    if (neuron.id == connection.input.id) {
                        inputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            if (connection.output.id < this.input_nodes.length + this.output_nodes.length + 1) {
                outputLoop: for (let neuron of this.output_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break outputLoop;
                    }
                }
            }
            else {
                hiddenLoop: for (let neuron of this.hidden_nodes) {
                    if (neuron.id == connection.output.id) {
                        outputNode = neuron;
                        break hiddenLoop;
                    }
                }
            }

            information.connections.push({inputId: inputNode.id, outputId: outputNode.id, weight: connection.weight, innovation: connection.innovation, enabled: connection.enabled});
        }

        return information;
    }

    export(fileName) {
        saveJSON(this.generateSavableGenome(), fileName + ".json");
    }

}

