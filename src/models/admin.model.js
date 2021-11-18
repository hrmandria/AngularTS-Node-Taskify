import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    username : {
        type : mongoose.Schema.Types.String,
        required : true,
        unique : true
    },
    password : {
        type : mongoose.Schema.Types.String,
        required : true
    }
})

const Admin = mongoose.model('admin',AdminSchema)

export { Admin,AdminSchema }