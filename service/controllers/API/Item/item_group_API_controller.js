
const {ItemGroupModel} = require('../../../models/ItemGroup')

exports.getAllItemGroups = function (){
    return (req, res) =>{
       const {Username} = req.body.userData;

       ItemGroupModel.find({Username}, (error, docs)=>{
        if(error) return res.status(500).json({error})
        if(!docs) return res.status(400).json({message: `No Item Groups find for user: ${Username}`})
        return res.status(200).json({docs})
       })
    }
}

exports.createItemGroup = function (){
    return (req, res) =>{
        const {Name, Description} = req.body.data;
        const {UserId} = req.body.userData.user;
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
    return (req, res) =>{
        
    }
}