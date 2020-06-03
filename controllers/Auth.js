'use strict';

var utils = require('../utils/writer.js');
var AuthService = require('../service/AuthService');

module.exports.login = function commentsGET (req, res, next) {
    var user = req.swagger.params['comment'].value;
    CommentService.login(user)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};


