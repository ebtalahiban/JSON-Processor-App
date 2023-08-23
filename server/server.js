const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/query', (req, res) => {
  const userText = req.body.userText;

  res.json({ userText });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});