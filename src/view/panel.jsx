import styles from './panel.module.css';
import { useControls } from '../components/controls';

export default function ControlsPanel() {
  const {
    controls: {
      tunnelColor,
      backgroundColor,
      animationSpeed,
      tunnelSize,
      rotationSpeed,
      tunnelShape,
      tunnelCurve,
    },
    setControls,
  } = useControls();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <h3 className={styles.h3}>CONTROLS</h3>
      <div
        className={styles.controlsRow}
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '32px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div className={styles.group}>
          <label htmlFor='tunnel-color' className={styles.label}>
            Tunnel Color
          </label>
          <input
            type='color'
            id='tunnel-color'
            value={tunnelColor}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                tunnelColor: e.currentTarget.value,
              }))
            }
            className={styles.colorInput}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor='background-color' className={styles.label}>
            Background Color
          </label>
          <input
            type='color'
            id='background-color'
            value={backgroundColor}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                backgroundColor: e.currentTarget.value,
              }))
            }
            className={styles.colorInput}
          />
        </div>
        <div className={styles.group}>
          <label htmlFor='speed-slider' className={styles.label}>
            Animation Speed
          </label>
          <input
            type='range'
            id='speed-slider'
            min='0.25'
            max='10'
            step='0.25'
            value={animationSpeed}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                animationSpeed: parseFloat(e.currentTarget.value),
              }))
            }
            className={styles.range}
          />
          <span className={styles.span}>{animationSpeed.toFixed(1)}x</span>
        </div>
        <div className={styles.group}>
          <label htmlFor='tunnel-size' className={styles.label}>
            Tunnel Size
          </label>
          <input
            type='range'
            id='tunnel-size'
            min='500'
            max='2000'
            value={tunnelSize}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                tunnelSize: parseInt(e.currentTarget.value),
              }))
            }
            className={styles.range}
          />
          <span className={styles.span}>{tunnelSize}</span>
        </div>
        <div className={styles.group}>
          <label htmlFor='rotation-speed' className={styles.label}>
            Rotation Speed
          </label>
          <input
            type='range'
            id='rotation-speed'
            min='0'
            max='1'
            step='0.01'
            value={rotationSpeed}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                rotationSpeed: parseFloat(e.currentTarget.value),
              }))
            }
            className={styles.range}
          />
          <span className={styles.span}>{rotationSpeed.toFixed(1)}</span>
        </div>
        <div className={styles.group}>
          <label htmlFor='tunnel-shape' className={styles.label}>
            Tunnel Shape
          </label>
          <select
            id='tunnel-shape'
            value={tunnelShape || 'circle'}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                tunnelShape: e.currentTarget.value,
              }))
            }
            className={styles.select}
          >
            <option value='circle'>Circle</option>
            <option value='triangle'>Triangle</option>
            <option value='square'>Square</option>
          </select>
        </div>
        <div className={styles.group}>
          <label htmlFor='tunnel-curve' className={styles.label}>
            Tunnel Curve
          </label>
          <input
            type='range'
            id='tunnel-curve'
            min='-45'
            max='45'
            step='1'
            value={tunnelCurve || 0}
            onInput={(e) =>
              setControls((c) => ({
                ...c,
                tunnelCurve: parseInt(e.currentTarget.value),
              }))
            }
            className={styles.range}
          />
          <span className={styles.span}>{tunnelCurve || 0}°</span>
        </div>
      </div>
    </div>
  );
}
