const Address = require('../models/index').Address;
const User = require('../models/index').User;
const createError = require('http-errors');

const updateFieldsRegex = /(country|state|city|address|zipCode)/;

module.exports.index = async (req, res, next) => {
    try{
        const user = await User.findOne({ 
            where: { id: req.session.user.id },
            include: [Address] 
        });
        return res.json({address: user.Addresses});
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.create = async (req, res, next) => {
    try{
        const { country, city, state, address, zipCode } = req.body;
        const userAddress = await Address.create({ country, city, state, address, zipCode, UserId: req.session.user.id });
        return res.status(201).json({ address: userAddress });
    }catch(err){
        next(createError(500, err));
    }
};


module.exports.update = async (req, res, next) => {
    try{
        const newFields = {};
        for (const field in req.body) {
            if (updateFieldsRegex.test(field)) {
                newFields[field] = req.body[field];
            }
        }
        if(Object.keys(newFields).length === 0)
            return next(createError(400, "nothing to update"));
        const address = await Address.update(newFields, {where: {id: req.params.id }});
        return res.json({ address });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.destroy = async(req, res, next) => {
    try{
        await Address.destroy({where: {id: req.params.id}});
        return res.json();
    }catch(err){
        next(createError(500, err));
    }
}