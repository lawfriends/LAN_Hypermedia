'use strict';

var utils = require('../utils/writer.js');
var AuthService = require('../service/AuthService');

module.exports.login = function login (req, res, next) {
    var user = req.swagger.params['user'].value;
    AuthService.login(user)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.usersPOST = function usersPOST (req, res, next) {
    var user = req.swagger.params['user'].value;
    AuthService.register(user)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};


