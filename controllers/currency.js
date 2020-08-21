const axios = require('axios');

module.exports.index = async(req, res, next)=> {
    try{
        const {data} = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}&format=1&symbols=EGP`);
        return res.json({egp: data.rates['EGP']})
    }catch(err){
        next(err);
    }
};