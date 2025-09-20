import Canvas from './views/canvas';
import { ControlsProvider } from './components/controls';
import styles from './app.module.css';
import ControlsPanel from './views/panel';

export function App() {
  return (
    <ControlsProvider>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.h1}>NETRUNNER TUNNEL</h1>
          <p className={styles.p}>Interactive Cyberpunk Animation</p>
        </header>
        <div className={styles.mainContent}>
          <div className={styles.canvasContainer}>
            <Canvas />
          </div>
          <div className={styles.controlsContainer}>
            <ControlsPanel />
          </div>
        </div>
      </div>
    </ControlsProvider>
  );
}

export default App;
