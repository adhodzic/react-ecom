const mongoose = require('mongoose')
const {ItemFieldModel} = require('../../../models/ItemField')

exports.getAllItemFields = function (){
    return (req, res) =>{
        console.log(req.query["id"])
       const ItemGroupId = req.query["id"];

       ItemFieldModel.find({ItemGroup: ItemGroupId}, (error, docs)=>{
        if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Fields find for user: ${ItemGroupId}`})
        return res.status(200).json({docs})
       })
    }
}

exports.createItemField = function (){
    return (req, res) =>{
        const {Name, Description, DataType, ItemGroupId} = req.body;
        
        if(!Name || !Description || !DataType || !ItemGroupId) return res.status(400).json({message: "Missing data on request"})
        const newItemField = new ItemFieldModel({
            Name,
            Description,
            DataType,
            ItemGroup: ItemGroupId
        })
        
        newItemField.save((err)=>{
            if(err) return res.status(500).json({err})
            return res.status(200).json({message: "Created new Item Field"})
        })
    }
}

exports.updateItemField = function (){
    return async (req, res) =>{
        const {Name, Description, id} = req.body; 
        let docs = await ItemFieldModel.findOneAndUpdate({_id: id}, {Name, Description}, {
            new: true
        });
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Fields find for user: ${ItemGroupId}`})
        return res.status(200).json({docs})
    }
}