
var sqlDB;

exports.authDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the user table exist');
  return sqlDB.schema.hasTable('user').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('user', (table) => {
        table.increments(); // the user id - PK
        table.string('username');
        table.string('hash');
        table.boolean('admin');
      })
    }
  });
};

exports.save = function(user) {
      return sqlDB('user')
          .returning()
          .insert({
              username: user.username,
              hash: user.hash,
              admin: false,
              },['id', 'username']);
}