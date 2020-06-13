let { courseDBSetup, coursePresentationDBSetup } = require('./dao/CourseDAO')
let { commentDBSetup } = require('./dao/CommentDAO')
let { personDBSetup, courseVolunteerDBSetup } = require('./dao/PersonDAO')
let { eventDBSetup } = require('./dao/EventDAO')
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
        eventDBSetup(sqlDB),
        resourceDBSetup(sqlDB),
        coursePresentationDBSetup(sqlDB),
        courseVolunteerDBSetup(sqlDB)
    ]);
}

module.exports = {
    database: sqlDB,
    setupDataLayer
}