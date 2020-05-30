var sqlDB;

exports.courseDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the couses table exist');
  return sqlDB.schema.hasTable('course').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('course', (table) => {
        table.increments(); // the course id - PK
        table.enum('level', ['Introductory','Basic','Intermediate']);
        table.enum('day', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        table.string('time');
        table.text('description');
        table.string('location');
        table.enum('cerf_level', ['A1','A2','B1','B2','C1','C2'])
      })
    }
  });
};

exports.coursePresentationDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the course_presentation table exist');
  return sqlDB.schema.hasTable('course_presentation').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('course_presentation', (table) => {
        table.integer('course_id').unsigned().references('id').inTable('course').notNullable(); // the course ID - FK - not nullable
        table.integer('event_id').unsigned().references('id').inTable('event').notNullable(); // the event ID - FK - not nullable
        table.primary(['course_id', 'event_id']);
      })
    }
  });
};

var { database } = require("../datalayer");

exports.save = function(course) {
    return sqlDB('course')
        .returning()
        .insert({
            level: course.level,
            description: course.description,
            location: course.location,
            time: course.time,
            day: course.day,
            cerf_level: course.cerf_level
            }, ['id', 'level', 'description']);
}

exports.getCourses = function() {
    return sqlDB('course');
}
