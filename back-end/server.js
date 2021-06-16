import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js'

dotenv.config()

const port= process.env.PORT || 8010
const mongodbConn= process.env.MONGODB_URL || 'mongodb://localhost/amazona'

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(mongodbConn,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
})

// app.use(express.json())



app.use('/api/users',userRouter)
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter);
 
app.get('/', (req,res)=>{
    res.send("Server is ready ")
})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})

app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})

