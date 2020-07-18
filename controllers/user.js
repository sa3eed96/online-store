const User = require('../models/index').User;
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const updateFieldsRegex = /(firstName|lastName|email|phone)/;

module.exports.update = async (req, res, next) => {
    try{
        const newFields = {};
        for (const field in req.body) {
            if (updateFieldsRegex.test(field)) {
                newFields[field] = req.body[field];
            }
        }
        if(Object.keys(newFields).length === 0)
            return res.json({});
        console.log(newFields);
        const [count, user] = await User.update(newFields, {where: {id: req.session.user.id }, returning: true});
        console.log(user[0]);
        req.session.user = user[0].toJSON();
        return res.json({ user });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.destroy = async(req, res, next)=> {
    try{
        const {password} = req.body;
        const user = await User.findByPk(req.session.user.id);
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck){
            return next(createError(400, 'invalid password'));
        }
        await User.destroy({where: {id: req.session.user.id}});
        next();
    }catch(err){
        next(createError(500, err));
    }
};
