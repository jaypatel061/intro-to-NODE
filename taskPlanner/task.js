let http = require ("http");
let url = require ("url");
let fs=require("fs");
let port = 9090;
let taskInfo =`
<form action="/store" method ="get">
<label> Employee ID:</label>
<input type ="number" name= "empid"/><br/>
<label> task ID: </label>
<input type="number" name="taskid" /><br/>
<label>task: </label>
<input type="text" name="task_info"/><br/>
<label>Deadline: </label>
<input type="date" name="dueDate"/><br/>
<input type="submit" value= "add Task" />
<input type ="reset" value="reset"/>
</form>`

let deleteData=`<form action="/delete" method = "get">
                <input type="submit" value= "Delete Task"><br/>
                </form>`
let showData=`<form action="/display" method ="get">
              <input type ="submit" value="List all tasks"><br/>
              </form>`


var addTask=[];          
let server = http.createServer((req,res)=>{
    console.log(url.parse(req.url,true))
    var pathInfo = url.parse(req.url,true).pathname;
    if (req.url =="/"){
        res.setHeader("content-type","text/html");
        res.end(taskInfo +" "+deleteData +" "+ showData)
        
        
    }else if (pathInfo=="/store"){
    
    var data=url.parse(req.url, true).query;
    /*console.log(data.empid);
    console.log(data.taskid);
    console.log(data.task_info);
    console.log(data.dueDate);*/
    var info ={"id": data.empid, "task": data.taskid, "taskInfo":data.task_info, "dueDate": data.dueDate};
    console.log(info);
  
    //var x= JSON.stringify(info);
    addTask.push(info);  
    let jsonData=JSON.stringify(addTask);
    //fs.writeFileSync("tasks.json",jsonData);
    fs.writeFile("tasks.json",jsonData,{file:"a"},(err)=>{
        if (!err){
            console.log("data store in a file");
        }
    })
    res.end();
    }
    else if (pathInfo=="/delete"){
        var data=url.parse(req.url, true).query;
        let readFile=fs.readFileSync("tasks.json");
        var y= JSON.parse(readFile);
       // var deleteArray=[];
        //deleteArray.push(y);
        //let deleteData=JSON.stringify(y);
       
        for (let i=0; i<y.length; i++){
            if(y[i].id == data.empid && y[i].task == data.taskid){
                res.write("Employee ID: "+data.empid+ "Task ID: "+ data.taskid + " deleted from the file.")
                y.splice(i,1);
                    i--;
            }
              
        }
        let deleteData1 = JSON.stringify(y);
        fs.writeFile("tasks.json",deleteData1,{file:"a"},(err)=>{
            if (!err){
                console.log("File updated...");
            }
        })
     
        
        res.end(`\n\n Updated file...    ${deleteData1}`);
    }
    
    else if(pathInfo=="/display"){
        let readFile=fs.readFileSync("tasks.json");
        var z= JSON.parse(readFile);
        let retrieveTableData=`
                               <table border ="1">
                               <tr>
                               <th>EmployeeID</th>
                               <th>TaskID</th>
                               <th>TaskInfo</th>
                               <th>DueDate</th>
                               </tr>`;
        for(let i =0; i<z.length; i++){
            retrieveTableData +=`<tr>
                                <td>${z[i].id}</td>
                                <td>${z[i].task}</td>
                                <td>${z[i].taskInfo}</td>
                                <td>${z[i].dueDate}</td>
                                </tr>`
        }
        retrieveTableData +=`</table>`;
        res.end(retrieveTableData);
    }
    
})

    

server.listen (port ,()=>console.log(`server is running on port number ${port}`));