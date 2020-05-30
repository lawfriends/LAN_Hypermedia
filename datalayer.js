let { courseDBSetup, coursePresentationDBSetup } = require('./dao/CourseDAO')
let { commentDBSetup } = require('./dao/CommentDAO')
let { personDBSetup } = require('./dao/PersonDAO')
let { eventDBSetup } = require('./dao/EventDAO')


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
        eventDBSetup(sqlDB),
        coursePresentationDBSetup(sqlDB)
    ]);
    //if you have other services, yoou should invoke all inside a promise and return it : Promise.all (...)
}

module.exports = {
    database: sqlDB,
    setupDataLayer
}