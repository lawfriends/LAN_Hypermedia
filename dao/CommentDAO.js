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
      })
    }
  });
};

var { database } = require("../datalayer");

exports.save = function(comment) {
  /*example:
  {
    "person_id" : 1,
    "text": "This is a very nice review about Alexandra Pozzi",
    "date": "2019-10-19 10:23:54+02",
    "student_name": "Michael B"
  }*/
  return sqlDB('comment')
      .returning()
      .insert({
          text: comment.text,
          person_id: comment.person_id,
          date: comment.date,
          student_name: comment.student_name,
          },['id','text','date','person_id']);
}

exports.getComments = function() {
    return sqlDB('comment');
}
