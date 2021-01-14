class Neuron {

    constructor(coords, id) {
        this.id = id;
        this.value = Infinity;
        this.inputs = [];

        if (coords)
            this.coords = coords;
        else
            this.coords = {
                x: parseInt(Math.random() * (genomeWindowWidth - 4 * neuron_size)) + 2 * neuron_size + genomeWindowOffsetX,
                y: parseInt(Math.random() * (genomeWindowHeight - 2 * neuron_size)) + neuron_size + genomeWindowOffsetY
            };
    }

    computeValue() {
        this.value = 0;
        for (let connection of this.inputs) {
            if (connection.enabled) {
                this.value += connection.weight * connection.input.getValue();
            }
        }

        this.value = activate(this.value);
        return this.value;
    }

    getValue() {
        return this.value == Infinity ? this.computeValue() : this.value;
    }

    draw() {
        fill(255);
        stroke(255, 229, 0);
        ellipse(this.coords.x, this.coords.y, neuron_size, neuron_size);
    }


}