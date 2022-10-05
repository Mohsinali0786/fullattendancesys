const User = require('../model/userModel')
const Company = require('../model/companyModel')
const bcrypt = require('bcryptjs')


const registerUser = async (req, res) => {
    try {
        console.log('req.body for users', req.body)

        let { firstName, lastName, email, password, companyName, type, userRole, isDeleted } = req.body
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const UserExist = await User.findOne({ email, companyName })
        console.log('UserExist=====>', UserExist)

        if (UserExist) {
            if (UserExist.isDeleted === false) {
                res.send({ status: 'error', message: 'This User is already registered' })
            }
            else {
                console.log('UserExist.id', UserExist.id)
                await User.deleteOne(UserExist)
                await User.create({
                    firstName,
                    lastName,
                    email,
                    password,
                    companyName,
                    type,
                    userRole,
                    isDeleted: false
                }).then(() => {
                    res.send({ status: 'success', message: 'Congratulations You added your user successfully' })
                }).catch((err) => {

                })
            }
        }
        else {
            res.send({ status: 'success', message: 'Congratulations You added your user successfully' })
            const myUser = await User.create({
                // companyName,
                firstName,
                lastName,
                email,
                password,
                companyName,
                type,
                userRole,
                isDeleted,
            });

            if (myUser) {
                res.status(201).send('data saved successfully')
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

const authUser = async (req, res) => {
    // console.log('-------------------', req.body)
    const { company, email, password } = req.body

    console.log('companycompany', password)
    let userExist = await User.find({ email, isDeleted: false })
    userExist = userExist.find((v) => v.companyName == company)
    // console.log('UserExist=====>', userExist.password)


    if (userExist) {
        const mypassword = await bcrypt.compare(password, userExist?.password)
        if (mypassword) {
            res.send({ status: 'success', message: 'Congratulation You Successfully Login !' })
        }
        else {
            res.send({
                status: 'error', message: 'Incorrect Password'
            })
        }
    }
    else {
        res.send({ status: 'error', message: 'User not exist please contact your admin' })
    }

}
const registerCompany = async (req, res) => {
    try {
        // console.log(req.body)

        let { companyName, contactNo, address, email, password, type, userRole } = req.body

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        // console.log('email===>', email)
        const CompanyExist = await Company.findOne({ email })
        // console.log('CompanyExist', CompanyExist)
        if (CompanyExist) {

            // res.status(400)
            res.send({ status: 'error', message: 'This Company is already registered' })
            // throw new Error('Company Already Exist')


        }
        else {
            res.send({ status: 'success', message: 'Signup Successfully' })

            const myCompany = await Company.create({
                companyName,
                contactNo,
                address,
                email,
                password,
                type,
                userRole,
            });

            if (myCompany) {
                res.status(201).json({
                    _id: myCompany._id,
                    companyName: myCompany.companyName,
                    contactNo: myCompany.contactNo,
                    address: myCompany.address,
                    email: myCompany.email,
                    password: myCompany.password,
                    // isAdmin: myCompany.isAdmin,
                })
            }
            else {
                res.status(400)
                throw new Error('Error Occured')
            }
        }
        //     await Company.findOne({email:email},(err ,result)=>{
        //         if(err){
        //             console.log('err',err)
        //         }

        //     })
        return res.send({ success: true })
    }
    catch (err) {

        console.log('err', err)
    }

}
const authCompany = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body

    const companyExist = await Company.findOne({ email })
    console.log('companyExist', companyExist)

    console.log('password', password)

    if (companyExist) {
        // const mypassword = await bcrypt.compare(password, companyExist?.password)
        const mypassword = await bcrypt.compare(password, companyExist.password)
        // const mypassword = await bcrypt.compare(password, userExist?.password)


        if (mypassword) {

            res.send({ status: 'success', message: 'Congratulation You Successfully Login !' })
        }
        else {
            res.send({ status: 'error', message: 'Wrong Passowrd' })
        }
    }
    else {

        res.send({ status: 'error', message: 'Sorry Company not found' })
        // res.status(400)
        // throw new Error('Invalid Company or Password')
    }

}

const changeRole = async (req, res) => {
    const { userRole } = req.body
    console.log('Change', req.body)
    try {
        const { id } = req.params
        const AllUsers = await User.find({})
        await User?.findByIdAndUpdate(id, {
            userRole: userRole
        })
        res.send({
            status: 'success',
            message: 'admin made by you Successfully',
            AllUsers,
        })

    }
    catch (err) {

        console.log('err', err)
    }

}

module.exports = { registerUser, authUser, authCompany, registerCompany, changeRole }
