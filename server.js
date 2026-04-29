import express from 'express'
import dotenv from 'dotenv'
import MongoDB from './config/db.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res)=> {
    res.send("Backend of Youtube is running...")
})
MongoDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`The server is running on Port: ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log('Failed to connect because of DB', err.message)
})

