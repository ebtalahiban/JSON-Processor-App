const express = require('express');
const app = express();
const cors = require('cors'); 
const axios = require('axios'); // Import axios
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/query', async (req, res) => {
  const userText = req.body.userText;

  try {
    const response = await axios.get(userText); // Send GET request to the provided URL
    const responseBody = response.data; // JSON response from the URL

    res.json(responseBody); // Send the JSON response back to the frontend
  } catch (error) {
    console.error('Error querying URL:', error);
    res.status(500).json({ error: 'Error querying URL' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
