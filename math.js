function sigmoid(x) {
    return 1 / (1 + Math.exp(-4.9 * x));
}

function step(x) {
    return x > 0 ? 0 : 1;
}

function activate(x) {
    return sigmoid(x);
}

function randomWeight() {
    return Math.random() * 2 - 1;
}

function lineIntersects(segment1, segment2) {
    let a_dx = segment1.x2 - segment1.x1;
    let a_dy = segment1.y2 - segment1.y1;
    let b_dx = segment2.x2 - segment2.x1;
    let b_dy = segment2.y2 - segment2.y1;
    let s = (-a_dy * (segment1.x1 - segment2.x1) + a_dx * (segment1.y1 - segment2.y1)) / (-b_dx * a_dy + a_dx * b_dy);
    let t = (+b_dx * (segment1.y1 - segment2.y1) - b_dy * (segment1.x1 - segment2.x1)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}