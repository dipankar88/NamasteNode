const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Server Home!');
});

app.get('/hello', (req, res) => {
  res.send('Server response for /hello!');
});

app.get('/hello/2', (req, res) => {
  res.send('2 Server response for /hello!');
});

app.get('/test', (req, res) => {
  res.send('Server response for /test');
});

app.get('/user', (req, res) => {
  res.send({ firstName: "Dipankar", lastName: "Ghosh"});
})

app.post('/user', (req, res)=>{
  res.send('User data updated successfully!');
})

app.delete('/user', (req, res)=> {
  res.send("User data deleted successfully");
})

app.listen(7000, ()=>{
    console.log("Server is running on http://localhost:7000");
});