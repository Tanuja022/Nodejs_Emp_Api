const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema(
    {
       name:{
        type:String,
        required:[true,'please enter your name']
       },
       birth:{
        type:Number,
        required:true
       },
       jobposition:{
        type:String,
        required:true

       },
       Address:{
        type:String,
        required:false
       },
    },
    {
        timestamps:true
    }
)

const Employee=mongoose.model('Employee',employeeSchema);
module.exports=Employee;