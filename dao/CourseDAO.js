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
        table.string('daysOfWeek');
        table.string('times');
        table.text('description');
        table.string('location');
        table.string('image');
        table.enum('cerf_level', ['A1','A2','B1','B2','C1','C2'])
      });
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
          times: course.times,
          daysOfWeek: course.daysOfWeek,
          image: course.image,
          cerf_level: course.cerf_level
          }, ['id', 'level', 'description','location','times','daysOfWeek','image','cerf_level'])
            .then((courseSaved)=>{
              if(course.volunteers && course.volunteers.length > 0) {
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
        .select(['cv.course_id', 'course.level', 'course.daysOfWeek', 'course.times', 'course.description','course.location', 'course.image', 'course.cerf_level', 
                  'cv.person_id', 'p.name','p.photo',
                  'cp.event_id', 'e.title', 'e.date', {eventLocation: 'e.location'}, 'e.photos'])
        .leftJoin('course_volunteer AS cv', 'cv.course_id', 'course.id')
        .leftJoin('person AS p', 'p.id', 'cv.person_id')
        .leftJoin('course_presentation AS cp', 'cp.course_id', 'course.id')
        .leftJoin('event AS e', 'e.id', 'cp.event_id')
        .where('course.id', id)
        .then((result)=> {

          let course = {
            id: (result[0].course_id || id),
            level: result[0].level,
            daysOfWeek: result[0].daysOfWeek,
            times: result[0].times,
            description: result[0].description,
            location: result[0].location,
            image: result[0].image,
            cerf_level: result[0].cerf_level,
          };
          const volunteers = extractVolunteers(result);
          const events = extractEvents(result);
          
          course["volunteers"] = volunteers;
          course["events"] = events;

          resolve(course);
        })
        .catch((error) => {
          reject("There are no courses found with this id");
        });
    });
}

function extractVolunteers(queryResult) {
  let volunteers = [];
  let selectedIds = [];
  for(let i = 0, len = queryResult.length; i < len; i++ ) {
    if(queryResult[i].person_id && selectedIds.indexOf(queryResult[i].person_id) == -1) {
      volunteers.push({
        id: queryResult[i].person_id,
        name: queryResult[i].name,
        photo: queryResult[i].photo
      });
      selectedIds.push(queryResult[i].person_id);
    }
  }
  return volunteers;
}

function extractEvents(queryResult) {
  let events = [];
  let selectedIds = [];
  for(let i = 0, len = queryResult.length; i < len; i++ ) {
    if(queryResult[i].event_id && selectedIds.indexOf(queryResult[i].event_id) == -1) {

      events.push({
        id: queryResult[i].event_id,
        title: queryResult[i].title,
        date: queryResult[i].date,
        location: queryResult[i].eventLocation,
        photos: queryResult[i].photos
      });
      selectedIds.push(queryResult[i].event_id);
    }
  }
  return events;
}
