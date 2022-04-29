var express = require('express');
var router = express.Router();

// route for questions collections
router.get('/', function(req, res, next) {
  res.json({response: 'you send me a GET request'});
});

// route for creating questions
router.post('/', function(req, res, next) {
  res.json({response: 'you send me a POST request', body: req.body});
});

// route for spesific questions
router.get('/:qID', function(req, res, next) {
  res.json({response: 'you send me a GET request ' + req.params.qID});
});

// route for creating answer
router.post('/:qID/answers', function(req, res, next) {
  res.json({
    response: 'you send me a POST request to /answers',
    questionsId: req.params.qID,
    body: req.body,
  });
});

// route for edit spesific answer
router.put('/:qID/answers/:aID', function(req, res, next) {
  res.json({
    response: 'you send me a PUT request to /answers',
    questionsId: req.params.qID,
    answerId: req.params.aID,
    body: req.body,
  });
});

// route for deleting spesific answer
router.delete('/:qID/answers/:aID', function(req, res, next) {
  res.json({
    response: 'you send me a DELETE request to /answers',
    questionsId: req.params.qID,
    answerId: req.params.aID,
  });
});

// route for upvote dan downvote
router.post('/:qID/answers/:aID/vote-:dir', function(req, res, next) {
  res.json({
    response: 'you send me a POST request to /vote-' + req.params.dir,
    questionsId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir,
  });
});

module.exports = router;