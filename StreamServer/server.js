// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your React app's URL if different
    methods: ['GET', 'POST'],
  },
});
//mongodb+srv://Akhilaesh:meda.akhil@myatlasclusteredu.wv2czbn.mongodb.net/realtimeapp/?retryWrites=true&w=majority&appName=myAtlasClusterEDU
// Connect to MongoDB
mongoose.connect('mongodb+srv://Akhilaesh:meda.akhil@myatlasclusteredu.wv2czbn.mongodb.net/realtimeapp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// On successful connection
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Watch the collection for changes
  const changeStream = db.collection('teams').watch();

  // Handle change events
  changeStream.on('change', (change) => {
    console.log('Change detected:', change);

    // Emit the change to connected clients
    io.emit('dataChanged', change);
  });
});

// API endpoint to fetch initial data
app.get('/api/items', async (req, res) => {
  try {
    const items = await db.collection('teams').find().toArray();
    console.log('Fetched items:', items);
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});




const teamSchema = new mongoose.Schema({
  teamName: String, 
  teamSize: Number,
  domain: String,
  problemStmt: String,
});
const Team = mongoose.model('teams', teamSchema);

// Define a route to insert data
app.post('/api/teams', async (req, res) => {
  try {
      const newTeam = new Team(req.body);
      console.log(req.body.teamName);
      
      await newTeam.save();
      res.status(201).send("Team created successfully!");
  } catch (error) {
      res.status(500).send(error.message);
  }
});




// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
