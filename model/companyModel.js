const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { STRING, STRING_REQUIRED } = require('./SchemaTypes')


const companySchema = mongoose.Schema(
    {
        companyName: STRING_REQUIRED,
        contactNo: STRING_REQUIRED,
        address: STRING_REQUIRED,
        email: STRING_REQUIRED,
        password: STRING_REQUIRED,
        userRole: STRING,
        type: STRING,
    },
)

// companySchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

//for password encrypt
// companySchema.pre('save', async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

// })

let Company = mongoose.model("Company", companySchema);
module.exports = Company;

