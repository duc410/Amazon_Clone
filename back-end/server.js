import express from 'express'
import data from './data.js'

const port= process.env.PORT ||8010

const app=express()

// app.use(express.json())

app.get('/api/products/:id',(req,res)=>{
    const product =data.products.find((x)=>x._id===req.params.id)
    if(product){
        res.send(product)
    }
    else{
        res.status(404)
           .send({message:'Product not found'})
    }
})

app.get('/api/products', (req,res)=>{
    res.send(data.products)
})
 
app.get('/', (req,res)=>{
    res.send("Server is ready ")
})

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})

