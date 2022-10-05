const Attendance = require('../model/attendanceModel')

// const addAttendance = async (req, res) => {
//     // console.log('req.body in attendance', req.body)
//     try {
//         const { currDate, currTime, currDay, status, email, companyName } = req.body
//         const IsAttendanceExist = await Attendance.findOne({ email, companyName })
//         console.log('req.body in attendance', IsAttendanceExist)

//         if (IsAttendanceExist && IsAttendanceExist?.currDate === currDate) {
//             // res.status(400)
//             res.send({ status: 'error', message: 'Sorry you already marked your attendance for today please try tomorrow' })
//             // throw new Error('Company Already Exist')
//         }
//         else {
//             res.send({ status: 'success', message: 'Your Attendance successfuly added for today' })
//             const myAttendance = await Attendance.create({
//                 currDate,
//                 currTime,
//                 currDay,
//                 status,
//                 email,
//                 companyName
//             });
//             console.log('myAttendance', myAttendance)

//             if (myAttendance) {
//                 res.send({
//                     status: 'success'
//                 })
//             }
//             else {
//                 res.status(400)
//                 throw new Error('Error Occured')
//             }
//         }

//         return res.send({ success: true })
//     }
//     catch (err) {
//         console.log('err', err)
//     }
// }

// const getAllAttendance = async (req, res) => {

//     const AllAttendance = await Attendance.find({})
//     // console.log('AllAttendance', AllAttendance)
//     if (AllAttendance) {
//         res.send({ status: 'Success', AllAttendance })
//     }
//     else {

//         res.send({
//             message: "Error in data receiving"
//         })
//     }
// }
// module.exports = { addAttendance, getAllAttendance }