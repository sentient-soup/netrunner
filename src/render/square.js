export function drawSquares(
  p,
  segments,
  speed,
  rotationSpeed,
  tunnelColor,
  baseRadius,
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
        segments[(i + 1 + segments.length) % segments.length].rotation -
        0.1 * rotationSpeed;
    }
    const perspective = 200 / (200 + segment.z);
    const radius = baseRadius * perspective;
    p.push();
    p.rotate(segment.rotation);
    p.rectMode(p.CENTER);
    p.rect(0, 0, radius * 2, radius * 2);
    p.pop();
  }
  p.pop();
}
