const express = require('express');
const app = express();
const cors = require('cors'); 
const axios = require('axios'); // Import axios
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/query', async (req, res) => {
  const userText = req.body.userText;

  if (!userText) {
    return res.status(400).json({ error: 'Invalid input. Please provide a valid URL.' });
  }

  try {
    const response = await axios.get(userText);
    const responseBody = response.data;
    res.json(responseBody);
  } catch (error) {
    console.error('Error querying URL:', error);
    res.status(500).json({ error: 'Error querying URL', errorMessage: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
