const mongoose = require('mongoose')
const {ItemDataModel} = require('../../../models/ItemData')

exports.getItemData = function (){
    return (req, res) =>{
        const {Item} = req.query
        const query = Item?{Item}:{}
        
        ItemDataModel.find(query, (error, docs)=>{
            if(error) return res.status(500).json({error})
            if(!docs) return res.status(400).json({message: `No Item Data find for Item: ${query}`})
            return res.status(200).json(docs)
        })
    }
}

exports.createItemData = function (){
    return (req, res) =>{
        const {Value, Option, ItemField, Item} = req.body;
        
        if(!ItemField || !Item || (!Value && !Option)) return res.status(400).json({message: "Missing data on request"})
        const newItemData = new ItemDataModel({
            Value,
            Option,
            ItemField,
            Item
        })
        
        newItemData.save((err)=>{
            if(err) return res.status(500).json({err})
            return res.status(200).json({message: "Created new Item Data"})
        })
    }
}

exports.updateItemData = function (){
    return async (req, res) =>{
        const {Value, Option, ItemField, Item} = req.body;
        const query = {ItemField, Item}
        const data = {Value, Option}
        let docs = await ItemDataModel.findOneAndUpdate(query, data, {
            new: true
        });
        
        if(!docs) return res.status(400).json({message: `No Item Data find for ${data._id}`})
        return res.status(200).json({docs})
    }
}

exports.deleteItemData = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 
        console.log(_ids)
        let docs = await ItemDataModel.deleteMany({_id: {$in: _ids}});
        console.log(docs)
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Data find`})
        return res.status(200).json(docs)
    }
}