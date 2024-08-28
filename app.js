const express = require('express')
const app = express()

app.get('/', (req, res) => {
    const ip = req.ip

    res.send("your ip" + ip)
})

app.listen(3000)