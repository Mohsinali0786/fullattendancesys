const User = require('../model/userModel')
const Attendance = require('../model/attendanceModel')
const bcrypt = require('bcryptjs')



const deleteUser = async (req, res) => {
    try {
        const AllUsers = await User.find({})

        // const findUserById = User.findOne(req.param.id)
        // console.log('findUserById', findUserById?.userRole)

        const IsDataExist = await User.findById(req.params.id)

        console.log('IsDataExist in deleteUser', IsDataExist)
        if (IsDataExist?.userRole !== 'admin') {

            await User.findByIdAndUpdate(req.params.id, {
                isDeleted: true
            })
            res.send({
                status: 'success',
                message: 'Your data deleted successfully',
                AllUsers,
            })
        }
        else {
            res.send({
                status: 'error',
                message: 'Admin are not deleteable',
                // AllUsers,
            })

            // }
        }
    }
    catch (err) {
        console.log('catch ===>', err)

        res.send({
            status: 'error',
            message: 'Error found'
        })
    }

}

const updateUser = async (req, res) => {

    let { firstName, lastName, email, password, userRole } = req.body
    // console.log('Updated Data', userRole)

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    console.log('Updated Id ', req.body)
    try {
        const AllUsers = await User.find({})
        await User.findByIdAndUpdate(req.params.id, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        } ).then(()=>{
            res.send({
                status: 'success',
                message: 'Your data Updated successfully',
                AllUsers,
            })
        }).catch((error)=>{
            res.send({
                status: 'error',
                
            })
        })
        
        



    }
    catch (err) {
        console.log('errr===>', err)
        res.send({
            status: 'error',
            message: 'Error found'
        })
    }

}
const addAttendance = async (req, res) => {
    // console.log('req.body in attendance', req.body)
    try {
        const { currDate, currTime, currDay, status, email, companyName } = req.body
        const IsAttendanceExist = await Attendance.findOne({ email, companyName })
        console.log('req.body in attendance', IsAttendanceExist)

        if (IsAttendanceExist && IsAttendanceExist?.currDate === currDate) {
            // res.status(400)
            res.send({ status: 'error', message: 'Sorry you already marked your attendance for today please try tomorrow' })
            // throw new Error('Company Already Exist')
        }
        else {
            res.send({ status: 'success', message: 'Your Attendance successfuly added for today' })
            const myAttendance = await Attendance.create({
                currDate,
                currTime,
                currDay,
                status,
                email,
                companyName
            });
            console.log('myAttendance', myAttendance)

            if (myAttendance) {
                res.send({
                    status: 'success'
                })
            }
            else {
                res.status(400)
                throw new Error('Error Occured')
            }
        }

        return res.send({ success: true })
    }
    catch (err) {
        console.log('err', err)
    }
}
module.exports = { deleteUser, updateUser, addAttendance }
