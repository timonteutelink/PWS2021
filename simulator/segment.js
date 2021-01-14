class Segment {

    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    rotate(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);

        let nx = cos * this.x1 - sin * this.y1;
        let ny = sin * this.x1 + cos * this.y1;

        this.x1 = nx;
        this.y1 = ny

        nx = cos * this.x2 - sin * this.y2;
        ny = sin * this.x2 + cos * this.y2;

        this.x2 = nx;
        this.y2 = ny;
    }

    intersects(rayStart, rayDirection) {
        let v1x = rayStart.x - this.x1;
        let v1y = rayStart.y - this.y1;
        let v2x = this.x2 - this.x1;
        let v2y = this.y2 - this.y1;
        let v3x = -rayDirection.y;
        let v3y = rayDirection.x;

        let dot = v2x * v3x + v2y * v3y;
        if (Math.abs(dot) < 0.000001)
            return Infinity;

        let t1 = (v1x * v2y - v1y * v2x) / dot;
        let t2 = (v1x * v3x + v1y * v3y) / dot;

        if (t1 >= 0.0 && (t2 >= 0.0 && t2 <= 1.0))
            return t1;

        return Infinity;
    }

    add(x, y) {
        this.x1 += x;
        this.x2 += x;
        this.y1 += y;
        this.y2 += y;
    }
    
    draw(r, g, b) {
        stroke(r, g, b);
        line(this.x1, this.y1, this.x2, this.y2);
    }


}