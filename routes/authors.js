const express = require('express');
const router = express.Router();
const Author = require('../models/authors');

//will give all of the authors
router.get("/", (req, res) =>{
    res.render('authors/index')
})

// new authors
router.get("/new", (req, res) =>{
    res.render('authors/new', { author: new Author()})
})

// Getting Data 
router.post("/", (req, res) =>{

});

module.exports = router;