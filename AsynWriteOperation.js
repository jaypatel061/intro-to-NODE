let fs=require("fs");
var msg="This is asynchornous message store through FS  module";
fs.writeFile("info1.txt",msg,{file:"a"},(err)=>{
    if (!err){
        console.log("data store in a file");
    }
})
console.log("done..")