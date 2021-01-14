class Species {

    constructor(representingGenome) {
        this.representingGenome = representingGenome;

        this.genomes = [];

        this.fitness = 0;

        this.highestFitness = 0;
        this.noFitnessUpgrades = 0;
    }

    isCompatible(genome) {
        let genepool = {};

        let highestInnovation1 = 0;
        let highestInnovation2 = 0;

        for (let connection of this.representingGenome.connections) {
            genepool[connection.innovation] = {
                connection1: connection
            };
            if (connection.innovation > highestInnovation1) {
                highestInnovation1 = connection.innovation;
            }
        }

        for (let connection of genome.connections) {
            if (genepool[connection.innovation])
                genepool[connection.innovation].connection2 = connection;
            else
                genepool[connection.innovation] = {
                    connection2: connection
                };
            if (connection.innovation > highestInnovation2) {
                highestInnovation2 = connection.innovation;
            }
        }

        let matchingNodes = 0;
        let disjointNodes = 0;
        let excessNodes = 0;

        let averageWeightDifference = 0;

        let genepoolValues = Object.values(genepool);

        for (let connections of genepoolValues) {
            if (connections) {
                if (connections.connection1 && connections.connection2) {
                    matchingNodes++;
                    averageWeightDifference += Math.abs(connections.connection1.weight - connections.connection2.weight);
                } else if (connections.connection1) {
                    if (highestInnovation1 > highestInnovation2)
                        excessNodes++;
                    else {
                        disjointNodes += excessNodes + 1;
                        excessNodes = 0;
                    }

                } else if (connections.connection2) {
                    if (highestInnovation1 > highestInnovation2) {
                        disjointNodes += excessNodes + 1;
                        excessNodes = 0;
                    } else
                        excessNodes++;
                }
            }
        }

        let largestGenomeSize = genome.connections.length > this.representingGenome.connections.length ? genome.connections.length : this.representingGenome.connections.length;

        //maybe remove this and just set to one or multiply by .1 for reduction
        if (largestGenomeSize < 20) {
            largestGenomeSize = 1;
        }
        //largestGenomeSize *= 0.1;

        if (matchingNodes != 0)
            averageWeightDifference /= matchingNodes;

        let delta = c1 * excessNodes / largestGenomeSize + c2 * disjointNodes / largestGenomeSize + c3 * averageWeightDifference;

        return delta < deltaT;
    }

    addGenome(genome) {
        this.genomes.push(genome);
    }

}