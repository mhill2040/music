var express = require('express');
var router = express.Router();
var Music = require('../models').Music;


router.post('/', function(req, res) {
  var title = req.body.title;
  Music.create({ title: title })
    .then( function() {
      res.redirect('/music');
  });
});

router.get('/', function(req, res) {
  Music.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
    .then( function(music) {
      return res.render('music', { music: music });
  })
});

router.get('/:id/edit', function(req, res) {
  Music.findById(req.params.id)
    .then( function(music) {
      return res.render('edit', { music: music });
  });
});

router.put('/:id', function(req, res) {
  Music.update(
    { title: req.body.title },
    { where: { id: req.params.id } }
  )
  .then( function() {
    return res.redirect('/music');
  })
});

router.delete('/:id', function(req, res) {
  Music.findById(req.params.id)
    .then( function(music) {
      music.destroy()
    })
    .then( function() {
      return res.redirect('/music');
  });
});

module.exports = router;
