// const Company = require('../model/companyModel')
// const bcrypt = require('bcryptjs')


// const registerCompany = async (req, res) => {
//     try {
//         // console.log(req.body)

//         const { companyName, contactNo, address, email, password, type, userRole } = req.body



//         // console.log('email===>', email)
//         const CompanyExist = await Company.findOne({ email })
//         // console.log('CompanyExist', CompanyExist)
//         if (CompanyExist) {

//             // res.status(400)
//             res.send({ status: 'error', message: 'This Company is already registered' })
//             // throw new Error('Company Already Exist')


//         }
//         else {
//             res.send({ status: 'success', message: 'Signup Successfully' })

//             const myCompany = await Company.create({
//                 companyName,
//                 contactNo,
//                 address,
//                 email,
//                 password,
//                 type,
//                 userRole,
//             });

//             if (myCompany) {
//                 res.status(201).json({
//                     _id: myCompany._id,
//                     companyName: myCompany.companyName,
//                     contactNo: myCompany.contactNo,
//                     address: myCompany.address,
//                     email: myCompany.email,
//                     password: myCompany.password,
//                     // isAdmin: myCompany.isAdmin,
//                 })
//             }
//             else {
//                 res.status(400)
//                 throw new Error('Error Occured')
//             }
//         }
//         //     await Company.findOne({email:email},(err ,result)=>{
//         //         if(err){
//         //             console.log('err',err)
//         //         }

//         //     })
//         return res.send({ success: true })
//     }
//     catch (err) {

//         console.log('err', err)
//     }

// }
// const authCompany = async (req, res) => {
//     // console.log(req.body)
//     const { email, password } = req.body
//     const companyExist = await Company.findOne({ email })


//     if (companyExist) {
//         const mypassword = await bcrypt.compare(password, companyExist?.password)
//         if (mypassword) {

//             res.send({ status: 'success', message: 'Congratulation You Successfully Login !' })
//         }
//         else {
//             res.send({ status: 'error', message: 'Wrong Passowrd' })
//         }
//     }
//     else {

//         res.send({ status: 'error', message: 'Sorry Company not found' })
//         // res.status(400)
//         // throw new Error('Invalid Company or Password')
//     }

// }


// const getCompany = async (req, res) => {
//     const AllCompanies = await Company.find({})
//     // console.log('AllComapnies', AllCompanies)

//     if (AllCompanies) {
//         // res.json(AllCompanies)
//         res.send({ status: 'success', AllCompanies })
//         // res.json(AllCompanies)
//     }
//     else {
//         res.send({
//             message: "Error in data receiving"
//         })
//     }

// }
// module.exports = { registerCompany, authCompany, getCompany }