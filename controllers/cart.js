const { hmSetAsync, hmGetAllAsync, hDelAsync, delAsync } = require('../redis');
const createError = require('http-errors');

module.exports.index = async (req, res, next)=>{
    try{
        const cart = await hmGetAllAsync(`cart-${req.session.user.id}`);
        return res.json({ cart });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.update = async(req,res,next) => {
    try{
        const {productId, productName, quantity, op} = req.body;
        if(op)
            await hmSetAsync(`cart-${req.session.user.id}`, `${productId}-${productName}`, quantity);
        else
            await hDelAsync(`cart-${req.session.user.id}`, `${productId}-${productName}`);
        return res.json();
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.delete = async(req, res, next) => {
    try{
        await delAsync(`cart-${req.session.user.id}`);
        return res.json();
    }catch(err){
        next(createError(500, err));
    }
};