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
    return new Promise((resolve, reject) => {
      sqlDB('course')
        .select(['cv.course_id', 'course.level', 'course.day', 'course.time', 'course.description','course.location', 'course.cerf_level', 'cv.person_id', 'p.name','p.photo'])
        .leftJoin('course_volunteer AS cv', 'cv.course_id', 'course.id')
        .leftJoin('person AS p', 'p.id', 'cv.person_id')
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
          let selectedIds = [];
          for(let i = 0, len = result.length; i < len; i++ ) {
            if(result[i].person_id && selectedIds.indexOf(result[i].person_id) == -1) {
              volunteers.push({
                id: result[i].person_id,
                name: result[i].name,
                photo: result[i].photo
              });
              selectedIds.push(result[i].person_id);
            }
            
          }

          course["volunteers"] = volunteers;
          resolve(course);
        })
    });
}
