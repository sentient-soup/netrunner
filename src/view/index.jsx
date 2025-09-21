import Canvas from './canvas';
import styles from './view.module.css';
import ControlsPanel from './panel';
import { useControls } from '../components/controls';

import { useState, useEffect } from 'react';
export default function MainView() {
  const {
    controls: { tunnelColor, backgroundColor },
  } = useControls();

  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 700px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggleControls = () => setShowControls((v) => !v);
  const handleCloseOverlay = (e) => {
    if (e.target.classList.contains(styles.controlsOverlay)) {
      setShowControls(false);
    }
  };
  const defaultStyling = {
    border: `2px solid ${tunnelColor}`,
    boxShadow: `0 0 12px ${tunnelColor}`,
    textShadow: `0 0 12px ${tunnelColor}`,
    background: backgroundColor,
    color: tunnelColor,
  };

  return (
    <div
      className={styles.container}
      style={{
        // background: `linear-gradient(135deg, darken(${backgroundColor}, 15%) 0%, darken(${tunnelColor}, 15%) 100%)`,
        background: backgroundColor,
      }}
    >
      <header
        className={styles.header}
        style={{
          border: `2px solid ${tunnelColor}`,
          boxShadow: `0 0 12px ${tunnelColor}`,
          background: backgroundColor,
          color: tunnelColor,
          textShadow: `0 0 12px ${tunnelColor}`,
        }}
      >
        <h1 className={styles.h1}>NETRUNNER TUNNEL</h1>
        <p className={styles.p}>Interactive Cyberpunk Animation</p>
      </header>
      <div
        className={styles.canvasContainer}
        style={{
          border: `2px solid ${tunnelColor}`,
          boxShadow: `0 0 12px ${tunnelColor}`,
          background: backgroundColor,
        }}
      >
        <Canvas />
      </div>
      <div
        className={styles.controlContainer}
        style={{
          border: `2px solid ${tunnelColor}`,
          boxShadow: `0 0 12px ${tunnelColor}`,
          background: backgroundColor,
          color: tunnelColor,
          textShadow: `0 0 12px ${tunnelColor}`,
        }}
      >
        <ControlsPanel />
      </div>
      <button
        className={styles.floatingControlsBtn}
        style={{
          border: `2px solid ${tunnelColor}`,
          boxShadow: `0 0 12px ${tunnelColor}`,
          background: tunnelColor,
          color: backgroundColor,
        }}
        aria-label='Show controls'
        onClick={handleToggleControls}
      >
        &#9776;
      </button>
      {showControls && (
        <div
          className={styles.controlsOverlay}
          style={{ background: `rgba(0,0,0,0.7)` }}
          onClick={handleCloseOverlay}
        >
          <div
            className={styles.controlsOverlayContent}
            style={{
              border: `2px solid ${tunnelColor}`,
              boxShadow: `0 0 12px ${tunnelColor}`,
              textShadow: `0 0 12px ${tunnelColor}`,
              background: backgroundColor,
              color: tunnelColor,
            }}
          >
            <ControlsPanel />
            <button
              style={{
                marginTop: 16,
                background: tunnelColor,
                color: backgroundColor,
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontSize: '1em',
                cursor: 'pointer',
              }}
              onClick={() => setShowControls(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
