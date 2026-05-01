import express from 'express'
import dotenv from 'dotenv'
import MongoDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

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

app.use('/', userRoutes)
app.use('/', videoRoutes)