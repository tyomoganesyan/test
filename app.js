const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log(req.ip)

    res.send('ok')
})

app.listen(3000)