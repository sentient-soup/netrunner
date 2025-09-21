import { ControlsProvider } from './components/controls';
import MainView from './view';

export default function App() {
  return (
    <ControlsProvider>
      <MainView />
    </ControlsProvider>
  );
}
