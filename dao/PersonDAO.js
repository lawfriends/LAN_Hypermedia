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

var { database } = require("../datalayer");

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
    return sqlDB('person')
        .returning()
        .insert({
            name: person.name,
            role: person.role,
            photo: person.photo,
            description: person.description,
            job: person.job,
            city: person.city,
            quote: person.quote,
            },['id', 'name', 'role', 'photo', 'description', 'job', 'city', 'quote' ]);
}

exports.getPeople = function() {
    return sqlDB('person');
}
