//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;

//MODEL(it is like a contract)
const Entry = require('./models/entries.js')

//PORT
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//DB SETUP
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `dockit`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//MIDDLEWARE
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
//ROUTES
//________________


//ROOT
app.get('/' , (req, res) => {
  res.send('I am not sure this is still connected!');
});

//HOME
app.get('/home', (req, res)=>{
    res.render('home.ejs')
      console.log('home is connected')
});

//INDEX
app.get('/dockit', (req, res)=>{
  Entry.find({}, (error, entry)=>{
      // console.log(Entry)
      res.render('index.ejs', {
          entry: entry
      });
  });
});


// NEW (CLIENT)
app.get('/dockit/new', (req, res) => {
  res.render('new.ejs')
})

// SHOW 
app.get('/dockit/:id', (req, res)=>{
  Entry.findById(req.params.id, (err, entry)=>{
      console.log(req.params.id)
      res.render('show.ejs', {
          entry:entry
      });
  });
});

//CREATE
app.post('/dockit', (req, res) => {
  if(req.body.zone === 1){ 
      return('great job')
  } 
  Entry.create(req.body, (error, entry)=>{
      if (error) {
          res.send(error)
      } else {
          res.redirect('/dockit');
      }
  });
})
// DELETE
app.delete('/dockit/:id', (req, res) => {
  Entry.findByIdAndRemove(req.params.id, (err, deletedEntry)=>{
      res.redirect('/dockit');//redirect back to entries index
  });
})
// EDIT (CLIENT)
app.get('/dockit/:id/edit', (req, res)=>{
  Entry.findById(req.params.id, (err, foundEntry)=>{ //find the entry
      res.render('edit.ejs', {
          entry: foundEntry //pass in found entry
      });
  });
});
// UPDATE (SERVER)
app.put('/dockit/:id', (req, res)=>{
  
  Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEntry)=>{
      res.redirect('/dockit');
  });
});

// app.get('/seed', async (req, res) => {
//     const newEntry =
      
//     [
//       {
//         distance: '12',
//         description:'We did 5 x 12 mins @22 with 5 mins rest time',
//         zone: '5',

        
//       }, {
//         distance: '12',
//         description:'We did 5 x 12 mins @22 with 5 mins rest time',
//         zone: '5',
        
//       }
//     ]


// try {
//   const seedItems = await Entry.create(newEntry)
//   res.send(seedItems)
// } catch (err) {
//   res.send(err.message)
// }
// })

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));