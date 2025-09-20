export function drawCircles(
  p,
  segments,
  speed,
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
    // segment.rotation += 0.01 * speed;
    if (segment.z < -interval) {
      segment.z = (maxSegments - 1) * interval;
    }
    const perspective = 200 / (200 + segment.z);
    const radius = baseRadius * perspective;
    p.ellipse(0, 0, radius * 2, radius * 2);
  }
  p.pop();
}
