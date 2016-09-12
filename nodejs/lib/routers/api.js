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

        if(newsModel.length >= req.params.id) {
            res.status(200).send(newsModel[req.params.id-1]);
        } else {
            res.status(404).send('Not Found.');
        }
    })
    .delete(function(req, res, next) {
        newsModel.splice(req.params.id-1,1)
        console.log(newsModel);
        res.status(200).end();
    })

module.exports = router;
