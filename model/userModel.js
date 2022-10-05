const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { STRING_REQUIRED, STRING, BOOLEAN_DEFAULT } = require('./SchemaTypes')


const userSchema = mongoose.Schema(
    {
        firstName: STRING_REQUIRED,
        lastName: STRING_REQUIRED,
        email: STRING_REQUIRED,
        password: STRING_REQUIRED,
        companyName: STRING_REQUIRED,
        userRole: STRING,
        type: STRING,
        isDeleted: BOOLEAN_DEFAULT,
        currentLoginCompany: STRING
    },
)


// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// //for password encrypt
// userSchema.pre('save', async function (next) {
//     if (!this.isModified("password")) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);

// })

let User = mongoose.model("User", userSchema);
module.exports = User;