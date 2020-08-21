const Address = require('../models/index').Address;
const fieldsToUpdate = require('../helper-modules/fieldstoupdate');

const updateFieldsRegex = /(country|city|address|zipCode)/;

module.exports.index = async (req, res, next) => {
    try{
        const addresses = await Address.findAll({
            where: {UserId: req.session.user.id},
            attributes:{exclude: ['createdAt', 'updatedAt']},
        });
        return res.json({ addresses });
    }catch(err){
        next(err);
    }
};

module.exports.create = async (req, res, next) => {
    try{
        const { country, city, address, zipCode } = req.body;
        const userAddress = await Address.create({ country, city, address, zipCode, UserId: req.session.user.id });
        return res.status(201).json({ address: userAddress });
    }catch(err){
        next(err);
    }
};


module.exports.update = async (req, res, next) => {
    try{
        const newFields = fieldsToUpdate(req.body, updateFieldsRegex);
        const [count, address] = await Address.update(newFields, {where: {id: req.params.id }, returning: true});
        return res.json({ address: address[0].toJSON() });
    }catch(err){
        next(err);
    }
};

module.exports.destroy = async(req, res, next) => {
    try{
        await Address.destroy({where: {id: req.params.id}});
        return res.json();
    }catch(err){
        next(err);
    }
}