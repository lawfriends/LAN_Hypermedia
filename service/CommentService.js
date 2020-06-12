'use strict';
/**
 * comments inventory
 * 
 * returns List
 **/

var commentDAO = require('../dao/CommentDAO');

exports.commentsGET = function() {
  return commentDAO.getComments();
}


/**
 * A specific comment
 * 
 * id Long comment id
 * returns Comment
 **/
exports.commentsIdGET = function(id) {
  return commentDAO.getComment(id);
}

/**
 * Save a new comment
 * 
 * id Long comment id
 * returns Comment
 **/

exports.commentPOST = function(comment) {
  return new Promise(function(resolve, reject) {
    if (Object.keys(comment).length > 0) {

      commentDAO.save(comment)
        .then((comment) => {
          if(comment.length) {
            resolve(comment[0])
          } else {
            resolve(comment);
          }
        }).catch(()=>{
          resolve();
        });

    } else {
      resolve();
    }
  });
}