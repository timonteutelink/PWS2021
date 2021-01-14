class Track {

    constructor() {
        this.segments = [];
    }

    addSegment(x1, y1, x2, y2) {
        this.segments.push(new Segment(x1, y1, x2, y2));
    }

    distance(rayStart, rayDirection) {
        let closestDistance = Infinity;

        for(let segment of this.segments) {
            let distance = segment.intersects(rayStart, rayDirection);

            if(distance < closestDistance) {
                closestDistance = distance;
            }
        }

        // console.log("rayStart: " + rayStart.x + ", " + rayStart.y);
        // console.log("rayDirection: " + rayDirection.x + ", " + rayDirection.y);

        // console.log(closestDistance);

        return closestDistance;
    }

    intersects(car) {
        //top segment
        let segment1 = new Segment(-size, -size * 2, size, -size * 2);
        //bottom segment
        let segment2 = new Segment(-size, size * 2, size, size * 2);
        //left segment
        let segment3 = new Segment(-size, -size * 2, -size, size * 2);
        //right segment
        let segment4 = new Segment(size, -size * 2, size, size * 2);

        segment1.rotate(car.rotation + Math.PI / 2);
        segment2.rotate(car.rotation + Math.PI / 2);
        segment3.rotate(car.rotation + Math.PI / 2);
        segment4.rotate(car.rotation + Math.PI / 2);

        segment1.add(car.x, car.y);
        segment2.add(car.x, car.y);
        segment3.add(car.x, car.y);
        segment4.add(car.x, car.y);

        for (let segment of this.segments) {
            if (lineIntersects(segment1, segment) || lineIntersects(segment2, segment) || lineIntersects(segment3, segment) || lineIntersects(segment4, segment))
                return true;
        }

        return false;
    }

    draw() {
        strokeWeight(4);
        for (let segment of this.segments) {
            segment.draw(255, 255, 255);
        }
    }

    print() {
        for (let segment of this.segments) {
            console.log("track.addSegment(" + segment.x1 + "," + segment.y1 + "," + segment.x2 + "," + segment.y2 + ");");
        }
    }

}

class CheckPoints {

    constructor() {
        this.segments = [];
    }

    draw() {
        strokeWeight(2);
        for (let item of this.segments) {
            item.segment.draw(0, 255, 0);
        }
    }

    addSegment(x1, y1, x2, y2) {
        this.segments.push({significance: this.segments.length, segment: new Segment(x1, y1, x2, y2)});
    }

    update(car) {
        //top segment
        let segment1 = new Segment(-size, -size * 2, size, -size * 2);
        //bottom segment
        let segment2 = new Segment(-size, size * 2, size, size * 2);
        //left segment
        let segment3 = new Segment(-size, -size * 2, -size, size * 2);
        //right segment
        let segment4 = new Segment(size, -size * 2, size, size * 2);

        segment1.rotate(car.rotation + Math.PI / 2);
        segment2.rotate(car.rotation + Math.PI / 2);
        segment3.rotate(car.rotation + Math.PI / 2);
        segment4.rotate(car.rotation + Math.PI / 2);

        segment1.add(car.x, car.y);
        segment2.add(car.x, car.y);
        segment3.add(car.x, car.y);
        segment4.add(car.x, car.y);

        for (let item of this.segments) {
            if(item.significance == car.index) {
                let segment = item.segment;

                if (lineIntersects(segment1, segment) || lineIntersects(segment2, segment) || lineIntersects(segment3, segment) || lineIntersects(segment4, segment)) {
                    car.score++;
        
                    car.index++;
                    if(car.index == this.segments.length) {
                        car.index = 0;
                    }

                    break;
                }    
            }
        }

    }

}