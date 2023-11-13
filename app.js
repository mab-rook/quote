const express = require('express')
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

// https://api.quotable.io/random
app.get('/quote', async (req, res) => {
  try {
    // const response = await axios.get('https://type.fit/api/quotes')
    const response = await axios.get('https://api.quotable.io/random')
    const qoute = response.data.content
    const author = response.data.author
    // const qoute = response.data.contents.qoutes[0].qoute;
    // const author = response.data.contents.qoutes[0].author;
    res.send({ qoute, author })
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving')
  }
})


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})