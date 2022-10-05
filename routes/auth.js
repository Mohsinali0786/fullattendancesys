const express = require('express')
const routes = express.Router()
const { registerCompany, authCompany, registerUser, authUser,changeRole } = require('../controllers/authController')
const { deleteUser, updateUser, addAttendance } = require('../controllers/postController')


routes.post('/sigup', registerCompany)
routes.post('/registeruser', registerUser)

routes.post('/logincompany', authCompany)
routes.post('/loginuser', authUser)
routes.post('/change-role/:id', changeRole)


routes.post('/deleteuser/:id', deleteUser)
routes.post('/updateuser/:id', updateUser)

routes.post('/addattendance', addAttendance)

module.exports = routes
