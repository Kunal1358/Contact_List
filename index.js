//  Aquiring the express Server
const express=require('express');

//  Aquiring path
const path=require('path');

// Defining the port
const port=8000;

// Starting express server
const app=express();

// To Acess Folder
app.set('views',path.join(__dirname,'view'));

// Included middlewear to acess and manipulate data
app.use(express.urlencoded());

// To use static files
app.use(express.static('assets'));

//Setting up our view Engine
app.set('view engine','ejs');

var contact_list=[
    {
        name:"DeadPool",
        phone: 8989898998
    },
    {
        name:"Tony Stark",
        phone:2134121414
    },
    {
        name:"Hulk",
        phone:4535353534
    }
];


// Check if server is up or not
app.listen(port,function(err){
    if(err){
        console.log("Error running the server: ", err);
        return;
    }
    console.log("Server is up and running on port:",port);
})


// Home mapping/route
app.get('/',function(req,res){

    // displaying the home.ejs file
    return res.render('home',
    {title:"Contact List",
    Contacts:contact_list
    });

})


// contact list mapping
app.post('/contact-list',function(req,res){

    // data can be accessed by req.body.__ 

    // Pushing form data into List
    contact_list.push({
        name: req.body.name,
        phone: req.body.phone
    });

    return res.redirect('back');

});


// delete mapping 
app.get('/delete-contact',function(req,res){

    // get the phone no
    let phone=req.query.phone;

    // search the contactIndex and delete
    let contactIndex = contact_list.findIndex( contact => contact.phone == phone ); 

    // delete contact if found
    if(contactIndex!=-1){
        contact_list.splice(contactIndex,1);
    }

    return res.redirect('back');

});
