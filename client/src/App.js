import 'bootstrap/dist/css/bootstrap.min.css';
import { AICropProvider } from './context/AICropContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <>
      <AICropProvider>
        <AppRoutes/>
      </AICropProvider>
    </>
  );
}

export default App;
