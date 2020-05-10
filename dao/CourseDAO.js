var sqlDB;

exports.coursesDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the couses table exist');
  return sqlDB.schema.hasTable('courses').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('courses', (table) => {
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

var { database } = require("../datalayer");

exports.save = function(course) {
    return sqlDB('courses')
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
    return sqlDB('courses');
}
