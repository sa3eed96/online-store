const Address = require('../models/index').Address;
const User = require('../models/index').User;
const createError = require('http-errors');

const updateFieldsRegex = /(country|city|address|zipCode)/;

module.exports.index = async (req, res, next) => {
    try{
        const addresses = await Address.findAll({
            where: {UserId: req.session.user.id},
            attributes:{exclude: ['createdAt', 'updatedAt']},
        });
        return res.json({ addresses });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.create = async (req, res, next) => {
    try{
        const { country, city, address, zipCode } = req.body;
        const userAddress = await Address.create({ country, city, address, zipCode, UserId: req.session.user.id });
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