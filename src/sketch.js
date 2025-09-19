let tunnelSegments = [];
let time = 0;
let tunnelColor = [0, 255, 136];
let backgroundColor = [0, 0, 17];
let isWireframe = false;
let animationSpeed = 1.0;
let tunnelSize = 100;
let rotationSpeed = 1.0;

const NUM_SEGMENTS = 50;
const SEGMENT_DISTANCE = 100;
const BASE_RADIUS = 500;

window.setup = function() {
  const container = document.getElementById('p5-canvas');
  const w = container ? container.clientWidth : 800;
  const h = container ? Math.max(300, Math.min(window.innerHeight - 200, w * 0.75)) : 600;
  const canvas = createCanvas(w, h);
  canvas.parent('p5-canvas');

  for (let i = 0; i < NUM_SEGMENTS; i++) {
    tunnelSegments.push({
      z: i * SEGMENT_DISTANCE,
      radius: BASE_RADIUS + sin(i * 0.1) * 10,
      rotation: i * 0.1,
    });
  }
}

window.draw = function() {
  time += 0.016 * animationSpeed;
  background(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  drawTunnel();
  if (isWireframe) drawWireframe();
  drawParticles();
}

function drawTunnel() {
  push();
  translate(width / 2, height / 2);
  for (let i = tunnelSegments.length - 1; i >= 0; i--) {
    const segment = tunnelSegments[i];
    segment.z -= 2 * animationSpeed;
    segment.rotation += 0.01 * rotationSpeed;
    if (segment.z < -SEGMENT_DISTANCE) {
      segment.z = (NUM_SEGMENTS - 1) * SEGMENT_DISTANCE;
      segment.radius = BASE_RADIUS + sin(time + i * 0.1) * 10;
    }
    const perspective = 200 / (200 + segment.z);
    const radius = segment.radius * perspective * (tunnelSize / 100);
    if (radius < 1) continue;
    push();
    rotate(segment.rotation);
    if (isWireframe) {
      stroke(tunnelColor[0], tunnelColor[1], tunnelColor[2], 150);
      strokeWeight(1);
      noFill();
    } else {
      fill(tunnelColor[0], tunnelColor[1], tunnelColor[2], 30);
      stroke(tunnelColor[0], tunnelColor[1], tunnelColor[2], 100);
      strokeWeight(2);
    }
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.1) {
      const x = cos(angle) * radius;
      const y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);
    if (isWireframe) {
      stroke(tunnelColor[0], tunnelColor[1], tunnelColor[2], 80);
      strokeWeight(0.5);
      for (let j = 0; j < 8; j++) {
        const a = (j / 8) * TWO_PI;
        const x1 = cos(a) * radius;
        const y1 = sin(a) * radius;
        const x2 = cos(a) * radius * 0.8;
        const y2 = sin(a) * radius * 0.8;
        line(x1, y1, x2, y2);
      }
    }
    pop();
  }
  pop();
}

function drawWireframe() {
  push();
  translate(width / 2, height / 2);
  stroke(tunnelColor[0], tunnelColor[1], tunnelColor[2], 60);
  strokeWeight(0.5);
  for (let i = 0; i < tunnelSegments.length - 1; i++) {
    const seg1 = tunnelSegments[i];
    const seg2 = tunnelSegments[i + 1];
    const persp1 = 200 / (200 + seg1.z);
    const persp2 = 200 / (200 + seg2.z);
    const radius1 = seg1.radius * persp1 * (tunnelSize / 100);
    const radius2 = seg2.radius * persp2 * (tunnelSize / 100);
    if (radius1 < 1 || radius2 < 1) continue;
    for (let j = 0; j < 16; j++) {
      const angle = (j / 16) * TWO_PI;
      const x1 = cos(angle + seg1.rotation) * radius1;
      const y1 = sin(angle + seg1.rotation) * radius1;
      const x2 = cos(angle + seg2.rotation) * radius2;
      const y2 = sin(angle + seg2.rotation) * radius2;
      line(x1, y1, x2, y2);
    }
  }
  pop();
}

function drawParticles() {
  push();
  translate(width / 2, height / 2);
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * TWO_PI + time * 0.5;
    const radius = 150 + sin(time * 2 + i) * 50;
    const x = cos(angle) * radius;
    const y = sin(angle) * radius;
    const alpha = map(sin(time * 3 + i), -1, 1, 50, 200);
    fill(tunnelColor[0], tunnelColor[1], tunnelColor[2], alpha);
    noStroke();
    ellipse(x, y, 2, 2);
  }
  for (let i = 0; i < 5; i++) {
    const streamAngle = (i / 5) * TWO_PI + time * 0.3;
    const streamRadius = 80 + sin(time * 1.5 + i * 2) * 30;
    for (let j = 0; j < 8; j++) {
      const particleAngle = streamAngle + (j / 8) * 0.5;
      const particleRadius = streamRadius + j * 5;
      const x = cos(particleAngle) * particleRadius;
      const y = sin(particleAngle) * particleRadius;
      const alpha = map(j, 0, 7, 200, 50);
      fill(tunnelColor[0], tunnelColor[1], tunnelColor[2], alpha);
      noStroke();
      ellipse(x, y, 1, 1);
    }
  }
  const glowSize = 100 + sin(time * 2) * 20;
  fill(tunnelColor[0], tunnelColor[1], tunnelColor[2], 20);
  noStroke();
  ellipse(0, 0, glowSize, glowSize);
  fill(tunnelColor[0], tunnelColor[1], tunnelColor[2], 60);
  ellipse(0, 0, 20, 20);
  pop();
}

window.updateTunnelColor = function(r, g, b) { tunnelColor = [r, g, b]; }
window.updateBackgroundColor = function(r, g, b) { backgroundColor = [r, g, b]; }
window.toggleWireframe = function(w) { isWireframe = w; }
window.updateAnimationSpeed = function(s) { animationSpeed = s; }
window.updateTunnelSize = function(s) { tunnelSize = s; }
window.updateRotationSpeed = function(s) { rotationSpeed = s; }

window.windowResized = function() {
  const container = document.getElementById('p5-canvas');
  if (container) {
    const w = container.clientWidth;
    const h = Math.max(300, Math.min(window.innerHeight - 200, w * 0.75));
    resizeCanvas(w, h);
  }
}

