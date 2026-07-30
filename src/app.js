const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server Home!');
});

app.get('/hello', (req, res) => {
  res.send('Server response for /hello!');
});

app.get('/test', (req, res) => {
  res.send('Server response for /test');
});

app.listen(7000, ()=>{
    console.log("Server is running on http://localhost:7000");
});