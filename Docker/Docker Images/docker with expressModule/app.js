let app=require("express")()

app.get("/",(req,res)=>{
	res.send("Welcome to express module using docker");
})


app.listen(9999,()=>console.log("Server is running"))