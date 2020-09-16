const validateForm = (formElements)=> {
    const arrElements = Array.prototype.slice.call(formElements);
    const invalidFormFields = arrElements
        .filter(elem => elem.name.length > 0)
        .map(x => {
            const { typeMismatch } = x.validity;
            const { name } = x;
            return {
                name,
                typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
                valid: x.checkValidity()
            };
        })
        .reduce((acc, currVal) =>{
            acc[currVal.name] = currVal.valid;
            return acc;
        }, {});
    return invalidFormFields
};

export default validateForm;