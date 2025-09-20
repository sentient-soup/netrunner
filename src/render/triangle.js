export function drawTriangles(
  p,
  segments,
  speed,
  tunnelColor,
  baseSize,
  interval,
  maxSegments
) {
  p.push();
  p.translate(p.width / 2, p.height / 2);
  p.stroke(...tunnelColor, 150);
  p.strokeWeight(1);
  p.noFill();
  for (let i = segments.length - 1; i >= 0; i--) {
    const segment = segments[i];
    segment.z -= 2 * speed;
    // segment.rotation += 0.01 * speed;
    if (segment.z < -interval) {
      segment.z = (maxSegments - 1) * interval;
    }
    const perspective = 200 / (200 + segment.z);
    const size = baseSize * 2 * perspective;

    const h = size / 2;
    const l = (size * 0.87) / 3;
    p.triangle(0, 0 - l * 2, -h, l, h, l);
  }
  p.pop();
}
