let { courseDBSetup } = require('./dao/CourseDAO')
let { commentDBSetup } = require('./dao/CommentDAO')
let { personDBSetup } = require('./dao/PersonDAO')
let { resourceDBSetup } = require('./dao/ResourceDAO')

const sqlDBFactory = require("knex");
let sqlDB = sqlDBFactory({
    client: "pg",
    debug: true,
    connection: {
        host: "localhost",
        port: "5432",
        user: "insiemeuser",
        password: "i1n2s3i4e5m6e7",
        database: "insieme"   
    }
});

function setupDataLayer() {
    console.log("setting up data layer");
    return Promise.all([
        courseDBSetup(sqlDB),
        personDBSetup(sqlDB),
        commentDBSetup(sqlDB),
        resourceDBSetup(sqlDB),

    ]);
    //if you have other services, yoou should invoke all inside a promise and return it : Promise.all (...)
}

module.exports = {
    database: sqlDB,
    setupDataLayer
}