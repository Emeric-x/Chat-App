const express = require('express');
const app = express()
const port = 3000;
const mongoose = require('./database/mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Import routes
const gamesRoute = require("./routes/games")
app.use('/games', gamesRoute)

/*app.get('/', (req, res) => {
    res.send('Hello World!')
});*/

app.listen(port, () => {
    console.log(`Server connected on port ${port} !`)
});