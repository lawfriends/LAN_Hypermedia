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
        host: "ec2-54-247-94-127.eu-west-1.compute.amazonaws.com",
        port: "5432",
        user: "wcoaejbbkvqofw",
        password: "1ce110cdf5e9806c4c49d75b8283737759651b463e08d2c0015b217432da766f",
        database: "dctlc3khsj99f1"
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