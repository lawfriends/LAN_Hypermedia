'use strict';

var utils = require('../utils/writer.js');
var CommentService = require('../service/CommentService');

module.exports.commentsGET = function commentsGET (req, res, next) {
  CommentService.commentsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentsIdGET = function commentsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  CommentService.commentsIdGET(id,limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.commentPOST = function commentPOST (req, res, next) {
  var comment = req.swagger.params['comment'].value;
  CommentService.commentPOST(comment)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
