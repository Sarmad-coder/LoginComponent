let mongoose=require("mongoose");
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/hiDB",(err,connection)=>{
    console.log(err||connection);
})