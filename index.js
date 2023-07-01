const express = require("express");
var ip = require("ip");
const path = require("path");
const port = 8000;

const db=require('./config/mongoose')     //initialised here from mongoose.js
const Contacts=require('./models/contacts');   // perform db.create, db.find, etc
const { error } = require("console");

const app = express();
app.use(express.urlencoded({ extended: true }))  //used to decode the encoded-form-data and access ad app.body


app.set("view engine", "ejs");  //used for rendering static templates.
app.set('views',path.join(__dirname,'views'))     //connected with relative path



app.get("/", (req, res) => {    
  Contacts.find({})             //querying db to display
  .then(results=>{
    return res.render('home', {
      title:"Home Page",
      contact_list:results
    });
  })
  .catch(err=>{
    console.log("Error reading contacts from DB",err);
    return;
  })
  
});
  

app.post('/form-action',(req,res)=>{
  // console.log(req.body)
  Contacts.create({        // insert into db using Contacts is schema , 
    name:req.body.name,    //mongoose internally connected with DB with schema(contact) 
    number:req.body.phone
  })
  .then(result=>{
    console.log('Added Contact: ',result);
  })
  .catch(err=>{
    console.log("Error reading contacts from DB",err);
    return;
  })
  return res.redirect('back')
})

app.get('/delete-contact/:id',(req,res)=>{
  const id=req.params.id;
  console.log(req.params.id);
  Contacts.findByIdAndDelete(id)
  .catch(err=>{
    console.log("Error deleting contact",err);
  })
  return res.redirect('back');
})


app.listen(port, (err) => {
  if(err){
    console.log("Error: ",err);
  }else{
    console.log("Running at: ", ip.address() + ":" + port);

  }
});
