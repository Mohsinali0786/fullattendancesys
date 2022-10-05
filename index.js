const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const userRoutes = require('./Routes')
const dotenv = require('dotenv')

app.use(express.json());

dotenv.config({ path: "./config/config.env" })

mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Database Connected')
    }).catch((err) => {
        console.log('Err===>', err)
    })

app.use(cors());
app.use("/api", userRoutes)
app.listen(process.env.PORT || 8080, () => {
    console.log(`App is running ${process.env.PORT}`)
})