const mongoose = require('mongoose')
const {ItemFieldModel} = require('../../../models/ItemField')

exports.getItemFields = function (){
    return (req, res) =>{
        const {ItemGroupId} = req.query
        const query = ItemGroupId?{ItemGroup: ItemGroupId}:{}
        
        ItemFieldModel.find(query, (error, docs)=>{
            if(error) return res.status(500).json({error})
            if(!docs) return res.status(400).json({message: `No Item Fields find for ItemGroup: ${query}`})
            return res.status(200).json(docs)
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
        const data = req.body.data; 
        let docs = await ItemFieldModel.findOneAndUpdate({_id: data._id}, data, {
            new: true
        });
        
        if(!docs) return res.status(400).json({message: `No Item Fields find for ${data._id}`})
        return res.status(200).json({docs})
    }
}

exports.deleteItemField = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 
        console.log(_ids)
        let docs = await ItemFieldModel.deleteMany({_id: {$in: _ids}});
        console.log(docs)
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Fields find`})
        return res.status(200).json(docs)
    }
}