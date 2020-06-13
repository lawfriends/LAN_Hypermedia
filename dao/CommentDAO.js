var sqlDB;

exports.commentDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the comments table exist');
  return sqlDB.schema.hasTable('comment').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('comment', (table) => {
        table.increments(); // the comment id - PK
        table.integer('person_id').unsigned().references('id').inTable('person'); // the person ID - FK - nullable
        table.text('text');
        table.timestamp('date').defaultTo(sqlDB.fn.now());
        table.string('student_name');
        table.string('photo');
      })
    }
  });
};

var { database } = require("../datalayer");

exports.save = function(comment) {
  return sqlDB('comment')
      .returning()
      .insert({
          text: comment.text,
          person_id: comment.person_id,
          date: comment.date,
          student_name: comment.student_name,
          photo: comment.photo
          },['id','text','date','person_id','photo']);
}

exports.getComments = function() {
    return sqlDB('comment');
}

exports.getComment = function(id) {
  return sqlDB('comment').where('id',id);
}