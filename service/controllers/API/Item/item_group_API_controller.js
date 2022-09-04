const mongoose = require('mongoose')
const {ItemGroupModel} = require('../../../models/ItemGroup')

exports.getAllItemGroups = function (){
    return (req, res) =>{
        ItemGroupModel.find({}, (error, docs)=>{
            if(error) return res.status(500).json({error})
            if(!docs) return res.status(400).json({message: `No Item Groups found for user: ${Username}`})
            return res.status(200).json({docs})
       })
    }
}

exports.createItemGroup = function (){
    return (req, res) =>{
        const {Name, Description} = req.body.data;
        const {UserId} = req.body.userData.user
        if(!Name || !Description) return res.status(400).json({message: "Missing data on request"})
        const newItemGroup = new ItemGroupModel({
            Name,
            Description,
            User: UserId
        })
        
        newItemGroup.save((err)=>{
            if(err) return res.status(500).json({err})
            return res.status(200).json({message: "Created new Item group"})
        })
    }
}

exports.updateItemGroup = function (){
    return async (req, res) =>{
        const {_id, ...data} = req.body.data; 
        console.log(_id, data)
        let docs = await ItemGroupModel.findOneAndUpdate({_id: _id}, data, {
            new: true
        });
        console.log(docs)
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Fields found for user: ${_id}`})
        return res.status(200).json(docs)
    }
}

exports.deleteItemGroup = function (){
    return async (req, res) =>{
        const _ids = req.body.data; 
        console.log(_ids)
        let docs = await ItemGroupModel.deleteMany({_id: {$in: _ids}});
        console.log(docs)
        //if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Fields found for user: ${id}`})
        return res.status(200).json(docs)
    }
}