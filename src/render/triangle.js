export function drawTriangles(
  p,
  segments,
  speed,
  rotationSpeed,
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
    segment.rotation += 0.01 * rotationSpeed;
    if (segment.z < -interval) {
      segment.z = (maxSegments - 1) * interval;
      segment.rotation =
        // Playing around with this yields interesting results
        // segments[(i - 1 + segments.length) % segments.length].rotation;
        segments[(i - 1 + segments.length) % segments.length].rotation -
        0.1 * rotationSpeed;
    }
    const perspective = 200 / (200 + segment.z);
    const size = baseSize * 2 * perspective;
    p.push();
    p.rotate(segment.rotation);
    const h = size / 2;
    const l = (size * 0.87) / 3;
    p.triangle(0, 0 - l * 2, -h, l, h, l);
    p.pop();
  }
  p.pop();
}
