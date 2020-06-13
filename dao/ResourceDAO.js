var sqlDB;

exports.resourceDBSetup = function (connection) {
  sqlDB = connection;
  console.log('checking if the resouce table exist');
  return sqlDB.schema.hasTable('resource').then((exists) => {
    if(!exists) {
      console.log('CREATE TABLE');
      return sqlDB.schema.withSchema('public').createTable('resource', (table) => {
        table.increments(); // the course id - PK
        table.integer('course_id');
        table.string('title');
        table.string('url');
        table.enum('cerf_level', ['A1','A2','B1','B2','C1','C2'])
      })
    }
  });
};

exports.getResourcesByCourseId = function(id, limit, offset) {
  if(!Number.isInteger(limit) || !Number.isInteger(offset) ) {
    limit = null;
    offset = null;
  }
  return sqlDB('resource').where('course_id',id).limit(limit).offset(offset);
}

exports.saveResourceOfCourse = function(resource, courseId) {
    return sqlDB('resource')
        .insert({
            course_id: courseId,
            title: resource.title,
            url: resource.url,
            cerf_level: resource.cerf_level
            }, ['id', 'course_id', 'title','url','cerf_level']);
}
