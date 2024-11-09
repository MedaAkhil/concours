import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
// import io from 'socket.io-client';
import NewPlayer from './NewPlayer';
import Live from './Live'

// const socket = io.connect('http://localhost:5000');

function App() {


  return (
    <div className='appmaindiv'>
      <header className='appheader'>
       <h2>CSI Concourse</h2>
        <div>
        <Link to="/newplayer" style={{
          textDecoration: "None",
          color: "white"
        }}>Start</Link>
        <Link to="/live" style={{
          marginLeft: 20,
          textDecoration: "None",
          color: "white"
        }} >Live</Link>
        </div>
      </header>

      <Routes>
        <Route path="/newplayer" element={<NewPlayer />} />
      </Routes>
      <Routes>
        <Route path="/live" element={<Live />} />
      </Routes>

    </div>
  );
}

export default App;
