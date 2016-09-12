var router = require('express').Router(),
    newsModel = require('../models/news');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send(newsModel);
    });

router.route('/:id')
    .get(function(req, res, next) {
        console.log({
          method: req.method,
          path: req.path,
          body: req.body,
          query: req.query,
          params: req.params
        });
        res.status(200).send(newsModel[req.params.id-1]);
    })
    .delete(function(req, res, next) {
        newsModel.splice(req.params.id-1,1)
        console.log(newsModel);
        res.status(200).end();
    })

module.exports = router;
