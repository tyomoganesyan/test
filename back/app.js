const express = require('express')
const app = express()
const body_parser = require('body-parser')
const cors = require('cors')
const URI = 'mongodb://localhost:27017'
const PORT = 3005
const { MongoClient } = require('mongodb')
const client = new MongoClient(URI)
app.use(body_parser.json())

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


client.connect().then(() => {
    console.log("connection to MongoDB:Success")
}).catch(() => {
    console.log("connection to MongoDB:fail")
})

const db = client.db('shop')

app.get('/products', async (req, res) => {
    try {
        const collection = db.collection('products')
        const products = await collection.find({}).toArray()
        res.status(200).json({ products })
    }
    catch (error) {
        res.status(400).json({ message: 'something went wrong...' })
    }
})

app.post('/products', async (req, res) => {
    if (!req.body.products) {
        console.log(req.body)
        return res.status(400).json({ message: "products required" })
    }
    try {
        const collection = db.collection('products')
        const { products } = req.body
        const result = await collection.insertMany(products)
        res.status(200).json({ result })
    }
    catch (error) {
        res.status(400).json({ message: 'something went wrong...' })
    }
})


app.listen(PORT, () => {
    console.log("server is listening to port: " + PORT)
})