const express = require('express');
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('./database/mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

//Import routes
const usersRoute = require("./routes/users")
app.use('/users', usersRoute)
const chatsRoute = require("./routes/chats")
app.use('/chats', chatsRoute)

app.get('/', (req, res) => {
    res.send('Chat-App Server side')
});

app.listen(port, () => {
    console.log(`Server connected on port ${port} !`)
});