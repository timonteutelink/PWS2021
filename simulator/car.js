class Car {

    constructor(x, y, rotation, genome) {
        this.x = x;
        this.y = y;

        this.rotation = rotation;

        this.genome = genome;

        this.frames = 0;
        
        this.index = 0;

        this.score = 0;
    }

    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation + Math.PI / 2);
        noStroke();
        fill(255);
        rect(-size, -size * 2, size * 2, size * 4);
        fill(255, 0, 0);
        rect(-size, -size * 2, size * 2, size);
        pop();
    }

    move(direction, speed) {
        this.rotation += direction * max_rotationSpeed;
        this.x += speed * max_speed * Math.cos(this.rotation);
        this.y += speed * max_speed * Math.sin(this.rotation);
    }

}