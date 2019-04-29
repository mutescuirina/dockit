//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const bodyParser = require ( 'body-parser' );

//MODEL(it is like a contract)
// const Entry = require('./models/entries.js')

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
//Controllers
const entriesController = require('./controllers/entries_controllers.js');

//___________________
//MIDDLEWARE
//___________________

app.use( bodyParser.urlencoded( { extended : false } ) ); // extended: false - does not allow nested objects in query strings
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//___________________
//ROUTES
//________________
app.use('/dockit',entriesController);

//ROOT
app.get('/' , (req, res) => {
  res.send('Lets go connected!');
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