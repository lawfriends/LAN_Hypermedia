var sqlDB;

exports.personDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the person table exist');
  return sqlDB.schema.hasTable('person').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('person', (table) => {
        table.increments(); // the person id - PK
        table.string('name');
        table.enum('role', ['teacher','coordinator']);
        table.string('photo');
        table.text('description');
        table.string('job');
        table.string('city');
        table.text('quote');
      })
    }
  });
};


exports.courseVolunteerDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the course_volunteer table exist');
  return sqlDB.schema.hasTable('course_volunteer').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('course_volunteer', (table) => {
        table.integer('course_id').unsigned().references('id').inTable('course').notNullable(); // the course ID - FK - not nullable
        table.integer('person_id').unsigned().references('id').inTable('person').notNullable(); // the event ID - FK - not nullable
        table.primary(['course_id', 'person_id']);
      })
    }
  });
};


exports.save = function(person) {
    return new Promise((resolve, reject) => {
      sqlDB('person')
        .returning()
        .insert({
            name: person.name,
            role: person.role,
            photo: person.photo,
            description: person.description,
            job: person.job,
            city: person.city,
            quote: person.quote,
            },['id', 'name', 'role', 'photo', 'description', 'job', 'city', 'quote' ])
              .then((personSaved)=>{
                if(person.courses && person.courses.length > 0) {
                  var courseVolunteers = person.courses.map(course => { 
                    return { 
                      course_id: course.id,
                      person_id: personSaved[0].id 
                    }
                  }); 
                  sqlDB.insert(courseVolunteers,['course_id', 'person_id']).into('course_volunteer')
                    .then((result2) => {
                      resolve(personSaved);
                    })
                    .catch((error) => {
                      console.log(error);
                      reject();
                    });
                } else {
                  resolve(personSaved);
                }
              })
              .catch((error)=> {
                console.log(error)
                reject();
              });     
            });
}

exports.getPeople = function(limit,offset) {
  if(!Number.isInteger(limit) || !Number.isInteger(offset)) {
    limit = null;
    offset = null;
  }
  return sqlDB('person').limit(limit).offset(offset);
}

exports.getPersonById = function(id) {
  return new Promise(function(resolve, reject) {
    sqlDB('person')
      .select(['person.id', 'person.name', 'person.role', 'person.photo', 'person.description', 'person.job', 'person.city', 'person.quote',
      {course_id: 'c.id'}, 'c.image', 'c.level', {course_description: 'c.description'},
      {comment_id: 'cm.id'}, 'cm.text', {comment_date: 'cm.date'}, 'cm.student_name', {comment_photo: 'cm.photo'}])
      .leftJoin('course_volunteer as cv', 'cv.person_id', 'person.id')
      .leftJoin('course as c', 'c.id', 'cv.course_id')
      .leftJoin('comment as cm', 'cm.person_id', 'person.id')
      .where('person.id', id)
      .then((result) => {
        if(!result) reject();
        if(!result.length) resolve([]);

        let person = {
          id: (result[0].id || id),
          name: result[0].name,
          role: result[0].role,
          photo: result[0].photo,
          description: result[0].description,
          job: result[0].job,
          city: result[0].city,
          quote: result[0].quote,
        };

        let courses = extractCourses(result);
        let comments = extractComments(result);

        person["courses"] = courses;
        person["comments"] = comments;

        resolve(person);
      })
    .catch((error) => {
      reject();
    });

  });
}

function extractCourses(queryResult) {
  let courses = [];
  let selectedIds = [];
  for(let i = 0, len = queryResult.length; i < len; i++ ) {
    if(queryResult[i].course_id && selectedIds.indexOf(queryResult[i].course_id) == -1) {
      courses.push({
        id: queryResult[i].course_id,
        level: queryResult[i].level,
        image: queryResult[i].image,
        description: queryResult[i].course_description
      });
      selectedIds.push(queryResult[i].course_id);
    }
  }
  return courses;
}

function extractComments(queryResult) {
  let comments = [];
  let selectedIds = [];
  for(let i = 0, len = queryResult.length; i < len; i++ ) {
    if(queryResult[i].comment_id && selectedIds.indexOf(queryResult[i].comment_id) == -1) {
      comments.push({
        id: queryResult[i].comment_id,
        text: queryResult[i].text,
        date: queryResult[i].comment_date,
        student_name: queryResult[i].student_name,
        photo: queryResult[i].comment_photo
      });
      selectedIds.push(queryResult[i].comment_id);
    }
  }
  return comments;
}