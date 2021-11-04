const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));

app.get('/api/movies', (req, res) => {
  const movies = ['Mean Girls', 'Hackers', 'The Grey', 'Sunshine', 'Ex Machina'];
  res.send(movies);
});

app.get('*', (req, res) => res.send('Hello World'));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
