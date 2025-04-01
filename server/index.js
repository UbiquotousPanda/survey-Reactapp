const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000; // Ensure this matches the port in Dockerfile and docker-compose.yml

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
});

const Survey = mongoose.model('Survey', surveySchema);

app.post('/submit', async (req, res) => {
  const survey = new Survey(req.body);
  await survey.save();
  res.send(survey);
});

app.get('/surveys', async (req, res) => {
  const surveys = await Survey.find();
  res.send(surveys);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});