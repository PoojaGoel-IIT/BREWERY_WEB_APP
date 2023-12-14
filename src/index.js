const express=require("express");
const app=express();
const path=require("path")
const collection=require("./mongodb")
const hbs=require("hbs")
const tempelatePath=path.join(__dirname,'../template')

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views",tempelatePath)
app.use(express.static('public'));

app.listen(3000,()=>{
    console.log("port connected");
})
app.get('/', (req, res) => {
    
    res.render("index.hbs");
  });

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        password:req.body.password
    }

    await collection.insertMany([data])
   
    res.render("search")

})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get('/search',(req,res)=>{
  
})






app.post("/login",async(req,res)=>{

    try{
      const check=await collection.findOne({name:req.body.username})
      if(check.password==req.body.password){
        res.render("search")
      }
      else{
        res.send("<script>alert('Wrong password'); window.location='/login';</script>")
      }
    }
    catch{

        res.send("<script>alert('Wrong details'); window.location='/login';</script>")

    }

})

