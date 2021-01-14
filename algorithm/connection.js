class Connection {

    constructor(innovation, input, output, weight) {
        this.innovation = innovation;
        this.input = input;
        this.output = output;
        this.weight = weight;
        this.enabled = true;
    }

    draw() {
        if (this.enabled || drawDisabled) {
            if (this.enabled)
                stroke(0, 169, 255);
            else
                stroke(255, 0, 255);
            strokeWeight(2);
            line(this.input.coords.x, this.input.coords.y, this.output.coords.x, this.output.coords.y);

            if (drawWeights) {
                strokeWeight(2);
                let textX = (this.input.coords.x + this.output.coords.x) / 2;
                let textY = (this.input.coords.y + this.output.coords.y) / 2 - 10;

                textSize(10);
                text(this.weight.toFixed(2), textX, textY);
            }
        }
    }

}