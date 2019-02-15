const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Hello there');
    res.send('Hello there');
})

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`))
