import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ButtonPage1 from './components/ButtonPage1';
import ButtonPage3 from './components/ButtonPage3';
import ButtonPage4 from './components/ButtonPage4';
import ButtonPage5 from './components/ButtonPage5';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="buttons">
          <Link to="/page1" className="button-box">
            <div>Show all books</div>
          </Link>
          <Link to="/page3" className="button-box">
            <div>update</div>
          </Link>
          <Link to="/page4" className="button-box">
            <div>delete book</div>
          </Link>
          <Link to="/page5" className="button-box">
            <div>Add book</div>
          </Link>
        </div>
        <Routes>
          <Route path="/page1" element={<ButtonPage1 />} />
          <Route path="/page3" element={<ButtonPage3 />} />
          <Route path="/page4" element={<ButtonPage4 />} />
          <Route path="/page5" element={<ButtonPage5 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;





