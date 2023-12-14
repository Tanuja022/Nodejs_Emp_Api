const express=require("express");
const app=express()
const Employee=require("./Modules/emp_module")

app.use(express.json())

// db connection
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/NodeEmpApi");
mongoose.connection.on('connected',()=>(console.log("Db connected successfully.")));
mongoose.connection.on('error',()=>(console.log('Not connect with db',err)));


// Routes

// create emp api
app.post("/employee",async(req,res)=>{
    try {
        const employee=await Employee.create(req.body);
        res.status(200).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
// get all data
app.get("/employee",async(req,res)=>{
    try {
        const empget=await Employee.find();
        res.status(200).json(empget);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})


// get data by id
app.get("/employee/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const empgetid=await Employee.findById(id);
        res.status(200).json(empgetid);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// update data
app.put("/employee/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const empgetidupdate=await Employee.findByIdAndUpdate(id,req.body);
        if(!empgetidupdate){
            res.status(404).json({message:`cannot find any product by this id ${id} `})
        }
        res.status(200).json(empgetidupdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// delete data
app.delete("/employee/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const empgetidupdate=await Employee.findByIdAndDelete(id);
        if(!empgetidupdate){
            res.status(404).json({message:`cannot find any product by this id ${id} `})
        }
        res.status(200).json(empgetidupdate);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

app.get("/",(req,res)=>{
    res.send("Hello world emp")
})

app.listen(3003,(req,res)=>{
    console.log("listening to port number  ")
})
