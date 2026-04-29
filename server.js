import express from 'express'

const app = express()
const PORT = 3000
app.use(express.json())

app.get('/', (req, res)=> {
    res.send("Backend of Youtube is running...")
})

app.listen(PORT, ()=>{
    console.log(`The server is running ar port: ${PORT}`)
})