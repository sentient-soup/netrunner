import { useContext, useState } from 'preact/hooks';

import { createContext } from 'preact';

const ControlsContext = createContext(null);

export function ControlsProvider({ children }) {
  const [controls, setControls] = useState({
    tunnelColor: '#00ff88',
    backgroundColor: '#000011',
    animationSpeed: 3,
    rotationSpeed: 1,
  });
  return (
    <ControlsContext.Provider value={{ controls, setControls }}>
      {children}
    </ControlsContext.Provider>
  );
}

export function useControls() {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error('useControls must be used within a ControlsProvider');
  }
  return context;
}
