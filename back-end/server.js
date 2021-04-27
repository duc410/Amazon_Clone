import express from 'express'
import data from './data.js'

const port= process.env.PORT ||8010

const app=express()

// app.use(express.json())

app.get('/api/products', (req,res)=>{
    res.send(data.products)
})
 
app.get('/', (req,res)=>{
    res.send("Server is ready  ")
})

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})

