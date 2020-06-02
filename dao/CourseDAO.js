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

exports.save = function(course) {
  return new Promise((resolve, reject) => {
    sqlDB('course')
      .returning()
      .insert({
          level: course.level,
          description: course.description,
          location: course.location,
          time: course.time,
          day: course.day,
          cerf_level: course.cerf_level
          }, ['id', 'level', 'description'])
            .then((courseSaved)=>{
              if(course.volunteers.length > 0) {
                var courseVolunteers = course.volunteers.map(volunteer => { 
                  return { 
                    course_id: courseSaved[0].id,
                    person_id: volunteer.id 
                  }
                }); 
                sqlDB.insert(courseVolunteers,['course_id', 'person_id']).into('course_volunteer')
                  .then((result2) => {
                    resolve(courseSaved);
                  })
                  .catch((error) => {
                    console.log(error);
                    reject();
                  });
              } else {
                resolve(courseSaved);
              }
            })
            .catch((error)=> {
              console.log(error)
              reject();
            });     
          });
}

exports.getCourses = function() {
    return sqlDB('course');
}

exports.getCourseById = function(id) {
    return sqlDB('courses').where('id', id);
}
