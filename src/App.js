import './App.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import BirdProfile from './BirdProfile';
import Home from './Home';
import BirdList from './BirdList';
import Nav from './Nav';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/birdlist" element={<BirdList />} />
          <Route path="/birdlist/:id" element={<BirdProfile />} />
      </Routes>
      <Nav />
      {/* <ul>
          {birdItems}
      </ul> */}
    </div>
  );
}

export default App;
