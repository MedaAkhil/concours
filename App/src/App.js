import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import NewPlayer from './NewPlayer';
import Live from './Live'

const socket = io.connect('http://localhost:5000');

function App() {


  return (
    <div>
      <h1>Players</h1>
      <header>
        <Link to="/newplayer" style={{
          textDecoration: "None"
        }}>Start</Link>
        <Link to="/live" style={{
          marginLeft: 20,
          textDecoration: "None"
        }} >Live</Link>
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
