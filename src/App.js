import Home from './Components/Home/Home.js';
import Menu from './Components/Menu/Menu.js';
import Record from './Components/Record/Record.js';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route key={22} path="/" element={<Home />} />
            <Route key={11} path="/menu" element={<Menu />} />
            <Route key={33} path="/record" element={<Record />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
