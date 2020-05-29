var sqlDB;

exports.eventDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the event table exist');
  return sqlDB.schema.hasTable('event').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('event', (table) => {
        table.increments(); // the course id - PK
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
