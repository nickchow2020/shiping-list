const express = require('express')
const database = require('./fakeDb')
const ExpressError = require('./expressError')

const app = express()
const Router = require("./items_route")

app.use(express.json()) // for parsing application/json
app.use("/items",Router)



app.use((req,res,next)=>{
    const notFoundError = new ExpressError("Not Found Page",404)
    next(notFoundError)
})


app.use((error,req,res,next)=>{
    let status = error.status || 500
    let message = error.message 

    res.status(status).json({
        error:{
            message,
            status
        }
    })
})

module.exports = app