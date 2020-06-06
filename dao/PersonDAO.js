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
  /*example
  {
    "name" : "Alexandra Rossi",
    "role": "teacher",
    "photo": "http://shorturl.at/lmwAF",
    "description": "This is one of the teachers",
    "job": "Fashion Photographer",
    "city": "Milano",
    "quote": "This is priceless"
  }
  */
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
                if(person.courses.length > 0) {
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

exports.getPeople = function() {
    return sqlDB('person');
}

exports.getPersonById = function(id) {
    let result = sqlDB('person').where('id', id);
    return result.length ? result[0] : result;
}