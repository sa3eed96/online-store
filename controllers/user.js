const User = require('../models/index').User;
const createError = require('http-errors');

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
        const user = await User.update(newFields, {where: {id: req.session.user.id }});
        return res.json({ user });
    }catch(err){
        next(createError(500, err));
    }
};
