import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const surveySchema = new Schema({
  name: String,
  email: String,
  feedback: String,
});

const Survey = model('Survey', surveySchema);

app.post('/submit', async (req, res) => {
  const survey = new Survey(req.body);
  await survey.save();
  res.send(survey);
});

app.get('/surveys', async (req, res) => {
  const surveys = await Survey.find();
  res.send(surveys);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});