//jshint esversion:6

const bodyParser = require('body-parser');
const express =require('express');
const date=require(__dirname + '/date.js');
const app=express();

let items=[];
let workitems=[];

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine','ejs');

// home route
app.get("/", (req,res)=>{
	let day=date();
	res.render("list",{listTitle: day, newListItem: items});
});

app.post("/",(req,res)=>{
     let item=req.body.newItem;
     if(req.body.button==="Work"){
		workitems.push(item);
		res.redirect("/work");
     } else {
	     items.push(item);
	     res.redirect("/");
     }
});

//work route
app.get("/work",(req,res)=>{
res.render("list",{listTitle: "Work List", newListItem: workitems});
});

app.post("/work",(req,res)=>{
workitems.push(req.body.newItem);
res.redirect("/work");
});


app.listen(3000,function(){
	console.log("server started in port 3000");
});