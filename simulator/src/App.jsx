import 'bootstrap/dist/css/bootstrap.min.css';
import { SimulatorProvider } from './context/SimulatorContext';


import { SimulatorRoutes } from './routes/SimulatorRoutes';

function App() {
  return (
    <>
      <SimulatorProvider>
        <SimulatorRoutes />
      </SimulatorProvider>
    </>
  );
}

export default App;
