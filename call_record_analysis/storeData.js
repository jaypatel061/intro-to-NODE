let fs = require("fs");

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
db.once("open",()=>{

    
    //Defined the schema 
    let callLogSchema =obj.Schema({
        "_id" : Number, 
        "source" : String, 
        "destination":String, 
        "sourceLocation":String, 
        "destinationLocation":String, 
        "callDuration":String, 
        "roaming":String, 
        "callCharge":Number
    })
    //Creating model using schema
    let callList = obj.model("",callLogSchema,"callLog");
    fs.readFile("call_data.json", (err,data)=>{
        if(!err){
            let callString=data.toString();
            let callJson=JSON.parse(callString);
            
            for(let i =0; i<callJson.length; i++){
                let c1=new callList({_id:callJson[i]._id,source:callJson[i].source,destination:callJson[i].destination,sourceLocation:callJson[i].sourceLocation,destinationLocation:callJson[i].destinationLocation,callDuration:callJson[i].callDuration,roaming:callJson[i].roaming,callCharge:callJson[i].callCharge});
                c1.save((result,err1)=> {
                if(!err1){
                    console.log("record inserted successfully "+result);
                }else{
                    console.log(err1);
                }
                obj.disconnect();   //close the connection..
                });
        
            }
        }
    })
/*
console.log("id is "+callJson[i]._id);
console.log("source is "+callJson[i].source);
console.log("destination is "+callJson[i].destination);
console.log("sourceLocation is "+callJson[i].sourceLocation);
console.log("destinationLocation is "+callJson[i].destinationLocation);
console.log("callDuration is "+callJson[i].callDuration);
console.log("roaming is "+callJson[i].roaming);
console.log("callCharge is "+callJson[i].callCharge);
console.log("\n");
*/
    
    

})