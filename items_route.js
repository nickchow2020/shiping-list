const express = require("express")
const ExpressError = require('./expressError')
const database = require('./fakeDb')

const router = new express.Router()

router.get("/",(req,res,next)=>{
    return res.json(database)
})

router.post("/",(req,res,next)=>{
    try{
        if(Object.keys(req.body).length === 0) throw new ExpressError("Please enter body data",404)
        console.log(Object.keys(req.body).length)
        database.push(req.body)
        return res.status(201).json({added:req.body})
    }catch(e){
        return next(e)
    }

})

router.get("/:name",(req,res,next)=>{
    try{
        const item = database.find(u => u.name === req.params.name)
        if(!item) throw new ExpressError("Data not Found",404)
        return res.status(200).json(item)
    }catch(e){
        return next(e)
    }
})

router.patch("/:name",(req,res,next)=>{
    try{
        const item = database.find(u => u.name === req.params.name)
        if(!item) throw new ExpressError("Data not found",404)
        item.name = req.body.name
        item.price = req.body.price
        return res.status(200).json({updated:item})
    }catch(e){
        return next(e)
    }

})

router.delete("/:name",(req,res,next)=>{
    try{
        const targetIndex = database.findIndex(u => u.name === req.params.name)
        if( targetIndex === -1 ) throw new ExpressError("Data not found",404)
        database.splice(targetIndex,1)
        return res.status(200).json({message:"Deleted"})
    }catch(e){
        return next(e)
    }

})


module.exports = router