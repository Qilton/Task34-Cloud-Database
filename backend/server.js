const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

app.use(cors());
app.use(express.json()); // No need for body-parser.json() as express.json() is sufficient

async function main() {
  try {
    await mongoose.connect('mongodb+srv://Swayam:9832900366@cluster0.z7kyt.mongodb.net/form', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Define the form schema and model
const formSchema = new Schema({
  name: String,
  email: String,
  message: String,
});
const Form = model('Form', formSchema);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/form', async (req, res) => {
  const { name, email, message } = req.body;
  const form = new Form({ name, email, message });
  console.log(req.body);
  try {
    await form.save();
    res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).send("Error saving form");
  }
});

app.get("/save",async(req,res)=>{
  const forms = await Form.find();
  console.log(forms)
  res.send(forms);
})
// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Call main to connect to the database
main();
