import { useContext } from 'preact/hooks';
import styles from './panel.module.css';
import { useControls } from '../components/controls';

export default function ControlsPanel() {
  const { controls, setControls } = useControls();

  return (
    <div className={styles.panel}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <h3 className={styles.h3}>CONTROLS</h3>
        <div
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
              value={controls.tunnelColor}
              onInput={(e) =>
                setControls({ ...controls, tunnelColor: e.currentTarget.value })
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
              value={controls.backgroundColor}
              onInput={(e) =>
                setControls({
                  ...controls,
                  backgroundColor: e.currentTarget.value,
                })
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
              min='0.5'
              max='3'
              step='0.1'
              value={controls.animationSpeed}
              onInput={(e) =>
                setControls({
                  ...controls,
                  animationSpeed: parseFloat(e.currentTarget.value),
                })
              }
              className={styles.range}
            />
            <span className={styles.span}>
              {controls.animationSpeed.toFixed(1)}x
            </span>
          </div>
          <div className={styles.group}>
            <label htmlFor='tunnel-size' className={styles.label}>
              Tunnel Size
            </label>
            <input
              type='range'
              id='tunnel-size'
              min='50'
              max='200'
              value={controls.tunnelSize}
              onInput={(e) =>
                setControls({
                  ...controls,
                  tunnelSize: parseInt(e.currentTarget.value),
                })
              }
              className={styles.range}
            />
            <span className={styles.span}>{controls.tunnelSize}</span>
          </div>
          <div className={styles.group}>
            <label htmlFor='rotation-speed' className={styles.label}>
              Rotation Speed
            </label>
            <input
              type='range'
              id='rotation-speed'
              min='0'
              max='5'
              step='0.1'
              value={controls.rotationSpeed}
              onInput={(e) =>
                setControls({
                  ...controls,
                  rotationSpeed: parseFloat(e.currentTarget.value),
                })
              }
              className={styles.range}
            />
            <span className={styles.span}>
              {controls.rotationSpeed.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
