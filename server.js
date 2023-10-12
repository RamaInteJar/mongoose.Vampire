const express = require('express');
const mongoose = require('mongoose');
const Vampire = require('./models/vampire.js');
const seedData = require('./models/seed_vampires.js');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuration
const mongoURI = "mongodb+srv://ramahawai2023ga:Atlanta2Miami2023@gaseir-523.luwg5rg.mongodb.net/vampires"; // Replace with your MongoDB URI
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected:', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));

db.on('open', () => {
  console.log('Connected to MongoDB!');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the vampires API!');
});

app.get('/vampires', async (req, res) => {
  try {
    const vampires = await Vampire.find({});
    res.send(vampires);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching vampires.' });
  }
});

app.get('/vampires/f', async (req, res) => {
  try {
    const femaleVampires = await Vampire.find({ gender: 'f' });
    res.send(femaleVampires);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching female vampires.' });
  }
});

app.get('/vampires/g500', async (req, res) => {
  try {
    const vampiresWithGt500Victims = await Vampire.find({ victims: { $gt: 500 } });
    res.send(vampiresWithGt500Victims);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching vampires with more than 500 victims.' });
  }
});

// ... (other routes)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});