const express = require('express')
const routes = express.Router()

const { getCompany, getAllUsers, getAllAttendance } = require('../controllers/getController')


routes.get('/getcompany', getCompany)
routes.get('/getusers', getAllUsers)
routes.get('/getattendance', getAllAttendance)

module.exports = routes