'use strict';

const authDAO = require('../dao/AuthDAO');
const jwt = require('jsonwebtoken');
const bycript = require('bcrypt');
const SECRET = 'mLkubdcc2qosB0b1HMk9';

exports.login = function(user) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(user).length == 0) reject();
    if (!user.username) reject();
    if (!user.pass) reject();
    
    authDAO.findUser(username).then((savedUser)=>{
        if(!savedUser.admin) reject();
        if(!savedUser || Object.keys(savedUser).length == 0) reject();
        isCorrectPass(savedUser.pass, user.pass).then(()=>{
            generateToken(user)
                .then((token)=> {
                    resolve(token);
                })
                .catch((error)=> {
                    reject("The login failed");
                });
        }).catch(()=>{
            reject("The login failed");
        });
    })
  });
}
exports.register = function(user) {
    return new Promise(function(resolve, reject) {
        if (Object.keys(user).length == 0) reject();
        if (!user.username) reject();
        if (!user.pass) reject();

        bcrypt.hash(user.pass, 10, function(err, hash) {
            if(hash) {
                user.pass = hash;
                authDAO.save(user)
                    .then((savedUser)=>{
                        resolve(savedUser);
                    })
                    .catch(error => {
                        reject("The registration failed");
                    });
            } else {
                reject("The registration failed");
            }
        });
    });
}

exports.verifyToken = function(token) {

}

function generateToken(user) {
    return new Promise(function(resolve, reject) {
        jwt.sign({user}, SECRET, { expiresIn: '2d' }, (err, token) => {
            if(token) {
                resolve(token);
            } else {
                reject();
            }
          });
    });
}

function isCorrectPass(pass, incomingPass) {
    return new Promise(function(resolve, reject){
        bcrypt.compare(incomingPass, pass, function(err, result) {
            if(result) {
                resolve();
            } else {
                reject();
            }
        });
    });
}