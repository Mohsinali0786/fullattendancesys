const mongoose = require('mongoose')
const { STRING } = require('./SchemaTypes')


const attendanceSchema = mongoose.Schema({
    currDate: STRING,
    currTime: STRING,
    currDay: STRING,
    status: STRING,
    email: STRING,
    companyName: STRING,
})

let Attendance = mongoose.model("Attendance", attendanceSchema)
module.exports = Attendance