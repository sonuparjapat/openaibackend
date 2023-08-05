const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");


const configuration = new Configuration({
  
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add CORS middleware
const port = 8080;

app.get('/', (req, res) => {
  res.send("Hello, this is the root path!");
});

app.post('/post', async (req, res) => {
  const { data } = req.body;
  
  try {
    const response = await openai.createChatCompletion({
      
      "model": "gpt-3.5-turbo",
      "messages": data,
      max_tokens: 100,
      temperature: 0.5,
    });
    
    res.json({
      message: response.data.choices[0].message.content,
    });
    // console.log("response", response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port at http://localhost:${port}`);
});
