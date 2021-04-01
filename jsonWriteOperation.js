let fs=require("fs");
var empObj='{"id":100,"name":"Ravi","salary":60000}';
//convert string to object
var empJson=JSON.parse(empObj);
console.log("ID is "+empJson.id);

//convert json to string
var empString=JSON.stringify(empJson);
fs.writeFile("emp.json",empString,(err)=>{
    if(!err){
        console.log("record store successfully")
    }
})