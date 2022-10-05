// const User = require('../model/userModel')
// const bcrypt = require('bcryptjs')


// const registerUser = async (req, res) => {
//     try {
//         console.log('req.body for users', req.body)

//         const { firstName, lastName, email, password, companyName, type, userRole, isDeleted } = req.body

//         const UserExist = await User.findOne({ email, companyName })
//         console.log('UserExist=====>', UserExist)

//         if (UserExist) {
//             if (UserExist.isDeleted === false) {
//                 res.send({ status: 'error', message: 'This User is already registered' })
//             }
//             else {
//                 console.log('UserExist.id', UserExist.id)
//                 await User.deleteOne(UserExist)
//                 await User.create({
//                     firstName,
//                     lastName,
//                     email,
//                     password,
//                     companyName,
//                     type,
//                     userRole,
//                     isDeleted: false
//                 }).then(() => {
//                     res.send({ status: 'success', message: 'Congratulations You added your user successfully' })
//                 }).catch((err) => {

//                 })
//             }
//         }
//         else {
//             res.send({ status: 'success', message: 'Congratulations You added your user successfully' })
//             const myUser = await User.create({
//                 // companyName,
//                 firstName,
//                 lastName,
//                 email,
//                 password,
//                 companyName,
//                 type,
//                 userRole,
//                 isDeleted,
//             });

//             if (myUser) {
//                 res.status(201).send('data saved successfully')
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

// const authUser = async (req, res) => {
//     // console.log('-------------------', req.body)
//     const { company, email, password } = req.body

//     console.log('companycompany', company)
//     let userExist = await User.find({ email, isDeleted: false })
//     userExist = userExist.find((v) => v.companyName == company)
//     console.log('UserExist=====>', userExist)


//     if (userExist) {
//         const mypassword = await bcrypt.compare(password, userExist?.password)
//         if (mypassword) {
//             res.send({ status: 'success', message: 'Congratulation You Successfully Login !' })
//         }
//         else {
//             res.send({
//                 status: 'error', message: 'Incorrect Password'
//             })
//         }
//     }
//     else {
//         res.send({ status: 'error', message: 'User not exist please contact your admin' })
//     }

// }

// const getAllUsers = async (req, res) => {
//     const AllUsers = await User.find({})
//     // console.log('AllUser', AllUsers)

//     if (AllUsers) {
//         // res.json(AllCompanies)
//         res.send({ status: 'success', AllUsers })
//         // res.json(AllCompanies)
//     }
//     else {
//         res.send({
//             message: "Error in data receiving"
//         })
//     }
// }

// const deleteUser = async (req, res) => {
//     try {
//         const AllUsers = await User.find({})
//         await User.findByIdAndUpdate(req.params.id, {
//             isDeleted: true
//         })
//         res.send({
//             status: 'success',
//             message: 'Your data deleted successfully',
//             AllUsers,

//         })
//     }
//     catch (err) {
//         console.log('catch ===>', err)

//         res.send({
//             status: 'error',
//             message: 'Error found'
//         })
//     }

// }

// const updateUser = async (req, res) => {

//     console.log('Updated Data', req.body)
//     const { firstName, lastName, email, password } = req.body

//     console.log('Updated Id ', req.params.id)
//     try {
//         const AllUsers = await User.find({})
//         await User.findByIdAndUpdate(req.params.id, {
//             firstName,
//             lastName,
//             email,
//             password,
//         })
//         res.send({
//             status: 'success',
//             message: 'Your data Updated successfully',
//             AllUsers,
//         })

//     }
//     catch (err) {
//         console.log('errr===>', err)
//         res.send({
//             status: 'error',
//             message: 'Error found'
//         })
//     }

// }
// module.exports = { registerUser, authUser, getAllUsers, deleteUser, updateUser }