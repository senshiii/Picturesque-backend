const sanitize = require('sanitize-html');

exports.sanitize = (req, res, next) => {
    for(let key of Object.keys(req.body)){
        if(typeof req.body[key] === 'string'){
            req.body[key] = sanitize(req.body[key], {
                allowedTags: [],
                allowedAttributes: {}
            })
        }
    }
    next();
}
