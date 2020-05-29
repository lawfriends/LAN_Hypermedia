'use strict';
/**
 * comments inventory
 *
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns List
 **/

var commentDAO = require('../dao/CommentDAO');

exports.commentsGET = function(limit,offset) {

  // return sqlDB("comments").limit(limit).offset(offset).then((data)
  return commentDAO.getComments().then((data) => {
    return data.map( element => {
      //composed resourse; element.price = {value: element.value, currency: element.currency}
        return element;
    })
  })

}


/**
 * A specific comment
 *
 * id Long comment id
 * limit Integer limit num of items per page (optional)
 * offset Integer Pagination offset, with default zero (optional)
 * returns Comment
 **/
exports.commentsIdGET = function(id,limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "level" : "Intermediate",
      "day": "Wednesday",
      "time": "17:00",
      "description": "This is the intermediate course of the Italian Language lessons",
      "location": "Via Edmondo de Amicis, 17, 20123 Milano MI",
      "cerf_level": "B1"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

exports.commentPOST = function(comment) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(comment).length > 0) {

        commentDAO.save(comment).then((comment) => {
        resolve(comment);
      });
    } else {
      resolve();
    }
  });
}