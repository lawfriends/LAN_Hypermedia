let { courseDBSetup, coursePresentationDBSetup } = require('./dao/CourseDAO')
let { commentDBSetup } = require('./dao/CommentDAO')
let { personDBSetup, courseVolunteerDBSetup } = require('./dao/PersonDAO')
let { eventDBSetup } = require('./dao/EventDAO')
let { resourceDBSetup } = require('./dao/ResourceDAO')


const sqlDBFactory = require("knex");
let sqlDB = sqlDBFactory({
    client: "pg",
    debug: false,
    connection: {
        host: "ec2-54-75-246-118.eu-west-1.compute.amazonaws.com",
        port: "5432",
        user: "qlakztbbxpjbch",
        password: "0182db017aeee465cc43bcf56b248a7ea5ec9d8e0bb4b52f2e27a45e32d31e74",
        database: "d5c92e58euk8f3"
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