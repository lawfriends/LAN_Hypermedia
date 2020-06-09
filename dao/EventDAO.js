var sqlDB;

exports.eventDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the event table exist');
  return sqlDB.schema.hasTable('event').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('event', (table) => {
        table.increments(); // the course id - PK
        table.string('title');
        table.timestamp('date').defaultTo(sqlDB.fn.now());
        table.string('location');
        table.text('description');
        table.text('photos');
        table.integer('contact_id');
      });
    }
  });
};

exports.getEvents = function() {
    return sqlDB('event');
}

exports.save = function(event) {
  return new Promise((resolve, reject) => {
    sqlDB('event')
      .insert({
          date: event.date,
          title: event.title,
          location: event.location,
          description: event.description,
          photos: event.photos,
          contact_id: event.coordinator.id
          },
          ['id','date','title','location','description','photos', 'contact_id']
          )
          .then((eventSaved)=>{
            if(event.courses.length > 0) {
              var coursePresentations = event.courses.map(course => { 
                return { 
                  course_id: course.id,
                  event_id: eventSaved[0].id 
                }
              }); 

              sqlDB.insert(coursePresentations,['course_id', 'event_id']).into('course_presentation')
                .then((result2) => {
                  resolve(eventSaved);
                })
                .catch((error) => {
                  console.log(error);
                  reject();
                });
            } else {
              resolve(eventSaved);
            }
          })
          .catch((error)=> {
            console.log(error)
            reject();
          });     
    });
}

exports.getEventById = function(id) {

  return new Promise(function(resolve, reject) {

    sqlDB('event')
      .select(['event.id', 'event.title', 'event.date', 'event.location', 'event.description', 'event.photos',
                {contact_id: 'p.id'}, 'p.name', 'p.photo'])
      .leftJoin('person AS p', 'p.id', 'event.contact_id')
      .where('event.id',id)
      .limit(1)
      .then((result)=> {

        if(!result) reject();

        let event = {
          id: (result[0].id || id),
          title: result[0].title,
          date: result[0].date,
          photos: result[0].photos,
          description: result[0].description,
          location: result[0].location,
        };
        if(result[0].contact_id) {
          let coordinator = {
            id: result[0].contact_id,
            name: result[0].name,
            photo: result[0].photo
          }
          event["coordinator"] = coordinator;
        }
        resolve(event);
      })
      .catch((error)=>{
        reject();
      });
    
  });
  
}