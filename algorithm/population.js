let currentGenerationConnectionMutations = [];
let currentGenerationNodeMutations = [];

let savedConnectionMutations = [];
let savedNodeMutations = [];

let globalBestGenome;
let generations = 1;

class Population {

    constructor(inputs, outputs) {
        this.species = [];

        let initialSpecies;

        for (let i = 0; i < populationSize; i++) {
            let genome = new Genome(inputs, outputs);

            if (!initialSpecies) {
                initialSpecies = new Species(genome);
            }

            initialSpecies.addGenome(genome);
        }

        this.species.push(initialSpecies);

        global_nodeInnovation = inputs + outputs + 1;
    }

    nextGeneration() {
        generations++;

        let newGenerationSpecies = [];

        let newGeneration = [];

        let placeHolderSpecies = [];

        let totalFitness = 0;

        let toRemove = [];

        //remove worst genomes
        for (let species of this.species) {
            genomeLoop: for(let genome of species.genomes) {

                if(toRemove.length < 10) {
                    toRemove.push(genome);
                    continue genomeLoop;
                }

                let highestScorer;

                for(let removalCandidate of toRemove) {
                    if(!highestScorer || removalCandidate.fitness > highestScorer.fitness) {
                        highestScorer = removalCandidate;
                    }
                }

                if(genome.fitness < highestScorer.fitness) {
                    toRemove.filter(g => g !== highestScorer);
                    toRemove.push(genome);
                }
            }
        }

        console.log(toRemove);

        speciesLoop: for (let species of this.species) {
            if (species.genomes.length == 0)
                continue speciesLoop;
            let newNewGenerationSpecies = new Species(species.genomes[Math.floor(Math.random() * species.genomes.length)].copy());
            newGenerationSpecies.push(newNewGenerationSpecies);

            let newSpecies = new Species(species.representingGenome);

            let bestGenome;
            for (let genome of species.genomes) {
                if (!globalBestGenome || genome.fitness > globalBestGenome.fitness)
                    globalBestGenome = genome.copy();
                    
                newNewGenerationSpecies.fitness += genome.fitness;

                genome.fitness /= species.genomes.length;

                if (!bestGenome || genome.fitness > bestGenome.fitness) {
                    bestGenome = genome;
                }
            }

            if (species.genomes.length > 5)
                newGeneration.push(bestGenome);
            else
                bestGenome = null;

            if (newNewGenerationSpecies.fitness > species.highestFitness) {
                newNewGenerationSpecies.noFitnessUpgrades = 0;
                newNewGenerationSpecies.highestFitness = newNewGenerationSpecies.fitness;
            } else {
                newNewGenerationSpecies.noFitnessUpgrades = species.noFitnessUpgrades + 1;
                newNewGenerationSpecies.highestFitness = newNewGenerationSpecies.fitness; //species.highestFitness;

                if (newNewGenerationSpecies.noFitnessUpgrades >= 15 && placeHolderSpecies.length > 1) {
                    continue speciesLoop;
                }
            }

            for (let genome of species.genomes) {
                if (Math.random() < mutationOnlyChance) {
                    genome.mutate();

                    newGeneration.push(genome);
                } else {
                    newSpecies.fitness += genome.fitness;

                    newSpecies.addGenome(genome);
                }
            }

            if (newSpecies.genomes.length != 0) {
                placeHolderSpecies.push(newSpecies);

                totalFitness += newSpecies.fitness;
            }
        }

        // calculate species offspring count and add them.

        let toAdd = populationSize - newGeneration.length;

        if (totalFitness != 0) {
            for (let species of placeHolderSpecies) {
                let offspring = Math.floor(toAdd * species.fitness / totalFitness);

                console.log("offspring: " + offspring);

                for (let i = 0; i < offspring; i++) {
                    let genome1;
                    let genome2;

                    let r = Math.random() * species.fitness;
                    for (let genome of species.genomes) {
                        r -= genome.fitness;
                        if (r <= 0) {
                            genome1 = genome;
                        }
                    }

                    r = Math.random() * species.fitness;
                    for (let genome of species.genomes) {
                        r -= genome.fitness;
                        if (r <= 0) {
                            genome2 = genome;
                        }
                    }

                    if (!genome1) {
                        genome1 = species.genomes[Math.floor(Math.random() * species.genomes.length)];
                    }
                    if (!genome2) {
                        genome2 = species.genomes[Math.floor(Math.random() * species.genomes.length)];
                    }

                    let child = genome1.crossover(genome2);
                    child.mutate();

                    newGeneration.push(child);
                }
            }
        }

        // add species till get to populationSize

        toAdd = populationSize - newGeneration.length;

        for (let i = 0; i < toAdd; i++) {
            let species = placeHolderSpecies[Math.floor(Math.random() * placeHolderSpecies.length)];

            let genome1;
            let genome2;

            let r = Math.random() * species.fitness;
            for (let genome of species.genomes) {
                r -= genome.fitness;
                if (r <= 0) {
                    genome1 = genome;
                }
            }

            r = Math.random() * species.fitness;
            for (let genome of species.genomes) {
                r -= genome.fitness;
                if (r <= 0) {
                    genome2 = genome;
                }
            }

            if (!genome1) {
                genome1 = species.genomes[Math.floor(Math.random() * species.genomes.length)];
            }
            if (!genome2) {
                genome2 = species.genomes[Math.floor(Math.random() * species.genomes.length)];
            }

            let child = genome1.crossover(genome2);
            child.mutate();

            newGeneration.push(child);
        }

        // loop through mutations to apply them and check for matching mutations so they can get same innovation
        let seperateMutations = savedConnectionMutations;

        loop: for (let mutation of currentGenerationConnectionMutations) {
            for (let seperateMutation of seperateMutations) {
                if (mutation.input.id == seperateMutation.input && mutation.output.id == seperateMutation.output) {
                    seperateMutation.mutations.push(mutation);
                    continue loop;
                }
            }

            seperateMutations.push({
                input: mutation.input.id,
                output: mutation.output.id,
                innovation: global_innovation++,
                mutations: [mutation]
            });
        }

        for (let seperateMutation of seperateMutations) {
            for (let mutation of seperateMutation.mutations) {
                mutation.genome.addConnection(mutation.input, mutation.output, randomWeight(), seperateMutation.innovation);
            }
        }

        for (let mutation of seperateMutations) {
            mutation.mutations = [];
        }
        savedConnectionMutations = seperateMutations;
        seperateMutations = savedNodeMutations;

        loop: for (let mutation of currentGenerationNodeMutations) {
            for (let seperateMutation of seperateMutations) {
                if (mutation.input.id == seperateMutation.input && mutation.output.id == seperateMutation.output) {
                    seperateMutation.mutations.push(mutation);
                    continue loop;
                }
            }

            seperateMutations.push({
                input: mutation.input.id,
                output: mutation.output.id,
                innovation1: global_innovation++,
                innovation2: global_innovation++,
                nodeInnovation: global_nodeInnovation++,
                mutations: [mutation]
            });
        }

        for (let seperateMutation of seperateMutations) {
            for (let mutation of seperateMutation.mutations) {
                let newNode = mutation.genome.addNode(seperateMutation.nodeInnovation);

                mutation.genome.addConnection(mutation.input, newNode, 1, seperateMutation.innovation1);
                mutation.genome.addConnection(newNode, mutation.output, mutation.weight, seperateMutation.innovation2);
            }
        }

        for (let mutation of seperateMutations) {
            mutation.mutations = [];
        }
        savedNodeMutations = seperateMutations;

        currentGenerationConnectionMutations = [];
        currentGenerationNodeMutations = [];

        //divide into species again

        genomeLoop: for (let genome of newGeneration) {
            genome.fitness = Infinity;
            for (let species of newGenerationSpecies) {
                if (species.isCompatible(genome)) {
                    species.addGenome(genome);
                    continue genomeLoop;
                }
            }
            //no matching species found create new species

            let newSpecies = new Species(genome);
            newSpecies.addGenome(genome);
            newGenerationSpecies.push(newSpecies);
        }

        newGenerationSpecies = newGenerationSpecies.filter((species) => species.genomes.length > 0);
        this.species = newGenerationSpecies;

        console.log(this.species.length);
    }


}