const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://canvasdb:3otzrUz8QzvKD5Ci@canvas-project.unblkwj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

//middleware routing 
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
  
     
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});