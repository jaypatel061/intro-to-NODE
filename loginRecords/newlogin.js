
class UserInfo {
    insert(){
        let obj = require("readline-sync");
        let fs=require("fs");
        const { stringify } = require("querystring");
        let info=[]
        let userInfo={};
        const currentDate=new Date();
        const currentDayOfMonth = currentDate.getDate();
        const currentMonth = currentDate.getMonth(); 
        const currentYear = currentDate.getFullYear();
        const cureentHour=currentDate.getHours();
        const currentMin=currentDate.getMinutes();
        const currentSec=currentDate.getSeconds();
        let numEmpInfo=obj.question("How many users info would you like to store in the file?");
        for (let i=0; i<numEmpInfo; i++){
            let fname1=obj.question("Enter your first name");
            let lname1=obj.question("Enter your last name");
            let gender1=obj.question("Are you a Male or Female?");
            let email1=obj.question("Enter your email");
            let dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;
            let timeString = cureentHour +":"+currentMin+":"+currentSec; 
    
            userInfo={"fname":fname1,"lname":lname1,"gender":gender1,"email":email1,"date":dateString, "time":timeString};
            info.push(userInfo);
        }
        let jsonData=JSON.stringify(info);
        fs.writeFileSync("user.json",jsonData);
        console.log("file written");

        console.log(info);
    }
}
exports.UserInfor=UserInfo;