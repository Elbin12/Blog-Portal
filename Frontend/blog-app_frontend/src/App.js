import logo from './logo.svg';
import './App.css';
import AppRoutes from './Routes/AppRoutes';
import {Toaster} from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-right"/>
      <AppRoutes/>
    </>
  );
}

export default App;
