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
          });
        }
      };

      p.draw = () => {
        time += 0.016 * controls.animationSpeed;
        p.background(...backgroundColor);
        draw[mode](
          p,
          tunnelSegments,
          controls.animationSpeed,
          controls.rotationSpeed,
          tunnelColor,
          controls.tunnelSize,
          interval,
          totalSegments,
          tunnelCurve
        );
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
