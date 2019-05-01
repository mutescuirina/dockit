const express = require('express');
const router = express.Router();
const Entry = require('../models/entries.js')


router.use(express.static('public'));



//INDEX
router.get('/', (req, res)=>{
  if(req.body.onWater === "on") {
    req.body.onWater = true;
  } else {
    req.body.onWater = false;
  }
  if(req.body.onLand === "on") {
    req.body.onLand = true;
  } else {
    req.body.onLand = false;
  }
  
    Entry.find({}, (error, entry)=>{
        console.log(entry)
        res.render('index.ejs', {
            entry: entry
        });
    });
  });


// NEW (CLIENT)
router.get('/new', (req, res) => {
    res.render('new.ejs')
  })
  
  // SHOW 
  router.get('/:id', (req, res)=>{
    Entry.findById(req.params.id, (err, entry)=>{
        console.log(req.params.id)
        res.render('show.ejs', {
            entry:entry
        });
    });
  });
  
  //CREATE
  router.post('/', (req, res) => {
    if(req.body.onWater === "on") {
      req.body.onWater = true;
    } else {
      req.body.onWater = false;
    }
    if(req.body.onLand === "on") {
      req.body.onLand = true;
    } else {
      req.body.onLand = false;
    }
      console.log(req.body);
    Entry.create(req.body, (error, entry)=>{
        if (error) {
            res.send(error)
        } else {
            console.log(entry)
            res.redirect('/dockit');
        }
    });
  })
  // DELETE
  router.delete('/:id', (req, res) => {
    Entry.findByIdAndRemove(req.params.id, (err, deletedEntry)=>{
        res.redirect('/dockit');//redirect back to entries index
    });
  })
  // EDIT (CLIENT)
  router.get('/:id/edit', (req, res)=>{
    if(req.body.onWater === "on") {
      req.body.onWater = true;
    } else {
      req.body.onWater = false;
    }
    if(req.body.onLand === "on") {
      req.body.onLand = true;
    } else {
      req.body.onLand = false;
    }
    Entry.findById(req.params.id, (err, foundEntry)=>{ //find the entry
        res.render('edit.ejs', {
            entry: foundEntry //pass in found entry
        });
    });
  });
  // UPDATE (SERVER)
  router.put( '/:id', (req, res)=>{
    Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEntry)=>{
      console.log('updatedEntry',updatedEntry );
        res.redirect('/dockit');
    });
  });





module.exports = router;