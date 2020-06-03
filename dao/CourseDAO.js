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
    return new Promise((resolve, reject) => {
      sqlDB('course')
        .join('course_volunteer AS cv', 'cv.course_id', 'course.id')
        .join('person AS p', 'p.id', 'cv.person_id')
        .where('course.id', id)
        .then((result)=> {

          let course = {
            id: (result[0].course_id || id),
            level: result[0].level,
            day: result[0].day,
            time: result[0].time,
            description: result[0].description,
            location: result[0].location,
            cerf_level: result[0].cerf_level,
          };
          let volunteers = [];
          for(let i = 0, len = result.length; i < len; i++ ) {
            volunteers.push({
              id: result[i].person_id,
              name: result[i].name,
              photo: result[i].photo
            });
          }

          course["volunteers"] = volunteers;
          resolve(course);
        })
    });
}
