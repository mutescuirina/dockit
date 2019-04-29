const express = require('express');
const router = express.Router();
const Entry = require('../models/entries.js')






//INDEX
router.get('/', (req, res)=>{
    Entry.find({}, (error, entry)=>{
        // console.log(Entry)
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
  router.get('/dockit/:id', (req, res)=>{
    Entry.findById(req.params.id, (err, entry)=>{
        console.log(req.params.id)
        res.render('show.ejs', {
            entry:entry
        });
    });
  });
  
  //CREATE
  router.post('/', (req, res) => {
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
    Entry.findById(req.params.id, (err, foundEntry)=>{ //find the entry
        res.render('edit.ejs', {
            entry: foundEntry //pass in found entry
        });
    });
  });
  // UPDATE (SERVER)
  router.put( '/:id', (req, res)=>{
    console.log('he')
    Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEntry)=>{
        res.redirect('/dockit');
    });
  });





module.exports = router;