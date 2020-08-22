const createError = require('http-errors');

module.exports = (body, fieldsRegex)=> {
    const fields = {};
    for (const field in body) {
        if (fieldsRegex.test(field)) {
            fields[field] = body[field];
        }
    }
    if(Object.keys(fields).length === 0){
        throw createError(400, "nothing to update");
    }
    return fields;
};