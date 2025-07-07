import express from 'express';
import OpenAI from 'openai';

const apiKey = '';
const openai = new OpenAI({apiKey});
const app = express();
const port = 3000;


app.get('/ask', async (req, res) => {
  console.log(JSON.stringify(req.query));
  const query = req.query;
  if (query.topic) {
    var model = "gpt-3.5-turbo";
    if (query.model) {
        model = `${query.model}`;
    }
    const response = await openai.responses.create({
      model: model,
      input: 
      `Generate an answer for this question: ${query.topic}.

       Format JSON Object:
       {
        "question": "${query.topic}"
        "answer": "YOUR ANSWER HERE"
       }

       Keep in mind: No extra text, no markdown! It is VERY important that all the information you provide is 100% correct.
       The reply has to be parsed in the next step by the client
      `
    });
  
    console.log(response.output_text);
    res.setHeader('Content-Type', 'application/json')
    res.send(response.output_text);
  } else {
    res.status(400).send('400 Bad Request');
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

