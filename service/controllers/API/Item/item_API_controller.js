const mongoose = require('mongoose')
const {ItemModel} = require('../../../models/Item')
const {ItemGroupModel} = require('../../../models/ItemGroup')
exports.getAllItems = function (){
    return (req, res) =>{
       ItemModel.find({}, (error, docs)=>{
        console.log(docs)
        if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item found`})
        return res.status(200).json({docs})
       }).populate('ItemGroup', 'Name Description', ItemGroupModel)
    }
}

exports.createItem = function (){
    return (req, res) =>{
        const {Name, ItemGroup} = req.body;
        
        if(!Name || !ItemGroup) return res.status(400).json({message: "Missing data on request"})
        
        ItemGroupModel.findOne({Name: ItemGroup},{}, (error, docs)=>{
            if(error) return res.status(500).json({error})
            if(!docs) return res.status(400).json({message: `No ItemGroup found`})
            const newItem = new ItemModel({
                Name: Name,
                ItemGroup: docs._id,
            })
            console.log(newItem,docs)
            newItem.save((err)=>{
                if(err) return res.status(500).json({err})
                return res.status(200).json({message: "Created new Item"})
            })
           })
    
    }
}

exports.updateItem = function (){
    return async (req, res) =>{
        const {Name, id} = req.body; 
        let docs = await ItemFieldModel.findOneAndUpdate({_id: id}, {Name}, {
            new: true
        });
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Items found`})
        return res.status(200).json({docs})
    }
}