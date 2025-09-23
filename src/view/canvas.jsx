import { useRef, useEffect } from 'preact/hooks';
import p5 from 'p5';
import { useControls } from '../components/controls';
import { hexToRgb } from '../components/utils';
import { drawCircles } from '../render/circle';
import { drawTriangles } from '../render/triangle';
import { drawSquares } from '../render/square';

const DrawMode = {
  circle: 'circle',
  triangle: 'triangle',
  square: 'square',
};

export default function Canvas() {
  const { controls } = useControls();
  const canvasRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    let tunnelSegments = [];
    let time = 0;

    const totalSegments = 50;
    const interval = 100;
    const tunnelCurve = controls.tunnelCurve;
    const tunnelColor = hexToRgb(controls.tunnelColor);
    const backgroundColor = hexToRgb(controls.backgroundColor);
    const mode = controls.tunnelShape;
    const draw = {
      [DrawMode.circle]: drawCircles,
      [DrawMode.triangle]: drawTriangles,
      [DrawMode.square]: drawSquares,
    };

    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        ).parent(canvasRef.current);
        tunnelSegments = [];
        for (let i = 0; i < totalSegments; i++) {
          tunnelSegments.push({
            z: i * interval,
            rotation: i * 0.1 * controls.rotationSpeed,
            size:
              controls.tunnelSize * Math.sin((i * Math.PI * 2) / totalSegments),
            x: 0,
            y: 0,
          });
        }
      };

      p.draw = () => {
        time += controls.animationSpeed;
        p.background(...backgroundColor);
        p.push();
        p.translate(p.width / 2, p.height / 2);
        // const seeds = [0.123, 0.456, 0.05, 0.789, 0.123, 0.07, 123.456];
        const depth = 1000;
        p.randomSeed(123);
        for (let i = 0; i < 1000; i++) {
          const starZ = (p.random(0, depth) - time) % depth;
          // const starZ = ((i * 123.456) % depth) - depth / 2;
          // const starZ = 1;
          const starX = p.random(-1000, 1000);
          // (Math.sin(i * 0.123 * 0.05) * depth) / 2 +
          // (Math.cos(i * 0.543) * depth) / 3;
          const starY = p.random(-1000, 1000);
          // (Math.cos(i * 0.789 * 0.07) * depth) / 2 +
          // (Math.sin(i * 0.987) * depth) / 4;

          const perspective = 200 / (starZ + 1000);
          const screenX = starX * perspective;
          const screenY = starY * perspective;

          p.fill(255, 255, 255);
          p.circle(screenX, screenY, 3);
        }

        p.pop();

        // draw[mode](
        //   p,
        //   tunnelSegments,
        //   controls.animationSpeed,
        //   controls.rotationSpeed,
        //   tunnelColor,
        //   controls.tunnelSize,
        //   interval,
        //   totalSegments,
        //   tunnelCurve
        // );
      };

      p.windowResized = () => {
        if (canvasRef.current) {
          p.resizeCanvas(
            canvasRef.current.clientWidth,
            canvasRef.current.clientHeight
          );
        }
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      p5Instance.current.remove();
    };
  }, [controls]);

  return (
    <div
      id='p5-canvas'
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
