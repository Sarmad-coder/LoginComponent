let mogoose=require("mongoose")

let usersSchema=mogoose.Schema({
    username:String,
    email:String,
    password:String,
    conformation:Boolean
})
let Users=mogoose.model("users",usersSchema)
module.exports=Users;