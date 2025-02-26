import { Outlet } from 'react-router-dom';
import './App.css';
import Headher from './components/Headher';
import MobileNavigation from './components/MobileNavigation';
import Footer from './components/footer';


function App() {
  return (
    <main className='pb-14 lg:pb-0'>
      <Headher />
      <div className='pt-16 text-white'>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
