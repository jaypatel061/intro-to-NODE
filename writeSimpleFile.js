let fs=require("fs");  //loaded core fs module
let msg="\nnext message added to the file";

fs.writeFileSync("info.txt", msg,{flag:"a"});
console.log("file stored successfully..")
console.log("done..");
console.log("done...");