import Home from './Components/Home/Home.js';
import Summary from './Components/Summary/Summary.js';
import Record from './Components/Record/Record.js';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/record" element={<Record />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
