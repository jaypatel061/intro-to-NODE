let app = require ("express")();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true})); 


let obj = require("mongoose");  //load the module
obj.Promise=global.Promise;   //creating the refrence
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption ={   //to avoid the warning
    useNewUrlParser:true,
    useUnifiedTopology:true
}
obj.connect(url,mongooseDbOption);  //ready to connect
let db = obj.connection; // connected to database.
db.on("error",(err)=>console.log(err));
 

let p =[];
db.once("open",()=>{

    
    //Defined the schema 
    let CourseSchema =obj.Schema({
        _id:Number,
        cname:String,
        cdesc:String,
        cfee:Number
    })
    //Creating model using schema
    let Course = obj.model("",CourseSchema,"Course");

    //creating refrence using model
    



/*
index.html                  get
retreive all course         get
create, delete and update   post
*/
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})
app.get("/addClasses.html",(req,res)=>{
    res.sendFile(__dirname+"/addClasses.html");
})
app.get("/delete.html",(req,res)=>{
    res.sendFile(__dirname+"/delete.html");
})
app.get("/update.html",(req,res)=>{
    res.sendFile(__dirname+"/update.html");
})



app.post("/storeCDetails",(req,res)=>{
    
    let courseId = req.body.courseId;
    let courseName = req.body.courseName;
    let description = req.body.courseDesc;
    let courseFee = req.body.courseFee;
    /*
    console.log(courseId);
    console.log(courseName);
    console.log(description);
    console.log(courseFee); */
    let c1=new Course({_id:courseId,cname:courseName,cdesc:description,cfee:courseFee});
    c1.save((err1,result)=>{
        if(!err1){
            console.log(result);
            res.send("record inserted successfully "+result);
            
        }else{
            res.send("Error is "+err1);
            //res.send("Error is "+ err);
        }
        obj.disconnect();   //close the connection..
    })
    
    //res.end();
})


app.post("/deleteCDetails",(req,res)=>{
    let courseId = req.body.courseId;
    //console.log(courseId);
    
    Course.deleteOne({_id:courseId},(err,result)=>{
        if(!err){
            //console.log("Record deleted successfully..")
            if(result.deletedCount>0){
                res.send("Record deleted")
                
            }else{
               res.send("Record not present")
                
            }

        }else{
            res.send("Record not present")
        }
        obj.disconnect();
    })
    
    //res.end();
    
})  


app.post("/updateCDetails",(req,res)=>{
    let courseId = req.body.courseId;
    let courseFee = req.body.courseFee;
    //console.log(courseId);
    //console.log(courseFee);
    Course.updateMany({_id:courseId},{$set:{cfee:courseFee}},(err,result)=>{

        if(!err){
            //console.log("Record updated successfully..")
            if(result.nModified>0){
                res.send("Record updated")
            }else{
               res.send("Record not present")
            }
        }
        obj.disconnect();
    })
    //res.end();

})

app.get("/display.html",(req,res)=>{
    
    //res.sendFile(__dirname+"/display.html");
    Course.find({},(err,result)=>{
        if(!err){
            result.forEach(doc=>p.push(doc))
        }
        obj.disconnect();
        
        console.log(p);
       
        
    })
    //console.log(p);
    
   
    res.json(p);

})

})


app.listen(9090,()=>console.log("Server running on port num 9090..."));