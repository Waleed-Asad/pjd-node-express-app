const Promise = require('bluebird');

const reject = module.exports.reject = function (scopeData) {
    return new Promise((resolve, reject)=>{
        return reject(scopeData);
    });
};

const success = module.exports.success = function (scopeData) {
    return new Promise((resolve, reject)=>{
        return resolve(scopeData);
    });
};