const express = require('express');
const http = require('http');// creating http server for websocket
const socketIo = require('socket.io');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 
const cors = require('cors');

// const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
// const canvasRoutes = require('./routes/canvas');


const mongoose = require('mongoose');

app.use(cors());
//http server created for websocket. need a seperated one from the server
const server = http.createServer(app);


// initilizing Socket.IO with the server instance
const io = new Server(server, {
  cors: {
      origin : ['http://localhost:8080'], // where the frontend lives
  }
});

//connection to websocket/socket.io
io.on('connection', (socket) => {
  console.log(`user socket id ${socket.id}`); //random id that is assisnged to each person when connected to server
  socket.on('send', (number, string, object) => {
      console.log(number, string, object); 
  })
})

// const connectionString = 'mongodb+srv://canvasdb:3otzrUz8QzvKD5Ci@canvas-project.unblkwj.mongodb.net/?retryWrites=true&w=majority';


// initilizing Socket.IO with the server instance
const io = new Server(server, {
  cors: {
      origin : ['http://localhost:8080'], // where the frontend lives
  }
});

//connection to websocket/socket.io
io.on('connection', (socket) => {
  console.log(`user socket id ${socket.id}`); //random id that is assisnged to each person when connected to server
  socket.on('send', (number, string, object) => {
      console.log(number, string, object); 
  })
})

// const connectionString = 'mongodb+srv://canvasdb:3otzrUz8QzvKD5Ci@canvas-project.unblkwj.mongodb.net/?retryWrites=true&w=majority';

// mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

//middleware routing 
// app.use('/auth', authRoutes);
// app.use('/user', userRoutes);
// app.use('/canvas', canvasRoutes);
  
     
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error(err.stack); // Log error stack to console
  res.status(500).send('Something broke!');
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Use the server instance to listen on the port, instead of the Express app
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});