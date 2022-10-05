const User = require('../model/userModel')
const Company = require('../model/companyModel')
const Attendance = require('../model/attendanceModel')



const getAllUsers = async (req, res) => {
    const AllUsers = await User.find({})
    // console.log('AllUser', AllUsers)

    if (AllUsers) {
        // res.json(AllCompanies)
        res.send({ status: 'success', AllUsers })
        // res.json(AllCompanies)
    }
    else {
        res.send({
            message: "Error in data receiving"
        })
    }
}
const getCompany = async (req, res) => {
    const AllCompanies = await Company.find({})
    // console.log('AllComapnies', AllCompanies)

    if (AllCompanies) {
        // res.json(AllCompanies)
        res.send({ status: 'success', AllCompanies })
        // res.json(AllCompanies)
    }
    else {
        res.send({
            message: "Error in data receiving"
        })
    }

}
const getAllAttendance = async (req, res) => {

    const AllAttendance = await Attendance.find({})
    // console.log('AllAttendance', AllAttendance)
    if (AllAttendance) {
        res.send({ status: 'Success', AllAttendance })
    }
    else {

        res.send({
            message: "Error in data receiving"
        })
    }
}

module.exports = { getAllUsers, getCompany, getAllAttendance }
