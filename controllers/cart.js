const { hmSetAsync, hmGetAllAsync, hDelAsync, delAsync } = require('../redis');
const createError = require('http-errors');

module.exports.index = async (req, res, next)=>{
    try{
        const cartObject = await hmGetAllAsync(`cart-${req.session.user.id}`);
        const cart = [];
        for (const key in cartObject) {
            const [productId, productName] = key.split('-');
            const [quantity, price] = cartObject[key].split('-');
            cart.push({productId, productName, quantity, price});
        }
        return res.json({ cart });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.update = async(req,res,next) => {
    try{
        const {productId, productName, quantity, op, price} = req.body;
        if(op == 1)
            await hmSetAsync(`cart-${req.session.user.id}`, `${productId}-${productName}`, `${quantity}-${price}`);
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