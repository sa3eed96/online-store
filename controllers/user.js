const User = require('../models/index').User;
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const fieldsToUpdate = require('../helper-modules/fieldstoupdate');

const updateFieldsRegex = /(firstName|lastName|email|phone)/;

module.exports.update = async (req, res, next) => {
    try{
        const newFields = fieldsToUpdate(req.body, updateFieldsRegex);
        const [count, user] = await User.update(newFields, {where: {id: req.session.user.id }, returning: true});
        req.session.user = user[0].toJSON();
        return res.json({ user: user[0].toJSON() });
    }catch(err){
        next(err);
    }
};

module.exports.destroy = async(req, res, next)=> {
    try{
        const {password} = req.body;
        const user = await User.findByPk(req.session.user.id);
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck){
            throw createError(400, 'invalid password');
        }
        await User.destroy({where: {id: req.session.user.id}});
        next();
    }catch(err){
        next(err);
    }
};
