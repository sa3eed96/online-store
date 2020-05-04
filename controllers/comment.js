const Comment = require('../models/index').Comment;
const User = require('../models/index').User;
const Product = require('../models/index').Product
const createError = require('http-errors');


module.exports.index = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { page } = req.query;
        const limit = 5;
        const offset = (page - 1) * limit;
        const { count, rows: comments } = await Comment.findAndCountAll({
            where:{
                UserId: req.session.user.id,
                ProductId: productId
            },
            limit,
            offset,
            include: [User],
        });
        return res.json({ comments, count });
    } catch (err) {
        next(createError(500, err));
    }
};

module.exports.create = async(req, res, next)=>{
    try{
        const { comment } = req.body;
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        if(!product)
            next(createError(400, 'product does not exist'));
        const createdComment = await Comment.create({ comment, ProductId: productId, UserId: req.session.user.id },{include: [User]});
        return res.json({ comment: createdComment });
    }catch(err){
        next(createError(500, err));
    }
};

module.exports.destroy = async(req, res, next)=>{
    try{
        await Comment.destroy({where: {id: req.params.commentId}});
        return res.json();
    }catch(err){
        next(createError(500, err));
    }
};