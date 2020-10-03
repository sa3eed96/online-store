/**
 * EmailLink Model controller to handle requests.
 * @module controllers/cart
 */

const { hmSetAsync, hmGetAllAsync, hDelAsync, delAsync } = require('../redis'); 
const Cart = require('../classes/cart');

/**
 * gets all cart items
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - json object containing cart items
 * @requires module:redis
 * @requires module:classes/cart
 */
module.exports.index = async (req, res, next)=>{
    try{
        const cartItems = await hmGetAllAsync(`cart-${req.session.user.id}`);
        const cart = new Cart(cartItems);
        return res.json({ cart: cart.items });
    }catch(err){
        next(err);
    }
};

/**
 * update cart item whether to update it or delete it depending on op parameter.
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @param {string} req.body.productName - product name 
 * @param {number} req.body.quantity - product quantity 
 * @param {number} req.body.price - product price 
 * @param {string} req.body.color - product color 
 * @param {number} req.body.productId - product id 
 * @param {number} req.body.op - operation number 0 for delete and 1 for update 
 * @returns {object} - empty json object
 * @requires module:redis
 */
module.exports.update = async(req,res,next) => {
    try{
        const {productId, productName, color, quantity, op, price} = req.body;
        if(op == 1)
            await hmSetAsync(`cart-${req.session.user.id}`, `${productId}-${productName}-${color}`, `${quantity}-${price}`);
        else
            await hDelAsync(`cart-${req.session.user.id}`, `${productId}-${productName}-${color}`);
        return res.json();
    }catch(err){
        next(err);
    }
};

/**
 * delete all cart items
 * @param {object} req  - Express request object
 * @param {object} res  - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {object} - empty json object
 * @requires module:redis
 */
module.exports.delete = async(req, res, next) => {
    try{
        await delAsync(`cart-${req.session.user.id}`);
        return res.json();
    }catch(err){
        next(err);
    }
};