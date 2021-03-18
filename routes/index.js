var express = require('express');
var router = express.Router();
var Accidents = require('../models/accident');


/* GET home page. */
router.post('/report-accident',function(req, res, next) {
  Accidents.create({
    photo:req.body.photo,
    location:req.body.location,
    latlng:req.body.latlng

  }).then((accident)=>{
    res.send(accident);
    console.log(accident);
  })
});

router.get('/getAccidents',function(req,res,next){
  Accidents.find({})
  .then((accidents)=>{
    res.send(accidents);
  })
})


module.exports = router;
