var router = require('express').Router(),
    usersModel = require('../models/users'),
    tool = require('../tool.js');

router.route('/')
    .get(function(req, res, next) {
        res.status(200).send(usersModel);
    });

router.route('/ageAvg')
  .get(function(req, res, next) {
      var ageSum = 0;
      var usersLen = usersModel.length;
      for(var i=0;i<usersLen;i++) {
        ageSum += usersModel[i].age;
      }
      var ageAvg = ageSum/usersLen;
      res.status(200).send({"ageAvg":ageAvg});
  });

router.route('/search')
  .get(function(req, res, next) {
      var company = req.query.company.toLowerCase();
      var arr = [];
      for(var i=0;i<usersModel.length;i++) {
          if(company == usersModel[i].company) {
              arr.push(usersModel[i]);
          }
      }
      if(arr) {
        res.status(200).send({"ageAvg":ageAvg});
      } else {
        res.status(404).send('Not Found.');
      }
  });

router.route('/count/:sex')
  .get(function(req, res, next) {
      var sex = req.params.sex;
      if(sex == 'male' || sex == 'female') {
        var count = 0;
        for(var i=0;i<usersModel.length;i++) {
          if(usersModel[i].sex == sex) {
            count++;
          }
        }
        res.status(200).send({"count":count});
      } else {
        res.status(200).send({"msg":"没有这个性别。。。"});
      }
  });

router.route('/:id')
  .get(function(req, res, next) {
      var id = parseInt(req.params.id,10);
      if(tool.isPint(id) && usersModel.length >= id) {
        var model = usersModel[id-1];
          res.status(200).send(model.firstName+model.lastName);
      } else {
          res.status(404).send('Not Found.');
      }
  })
  .put(function(req, res, next) {
      var id = parseInt(req.params.id,10);
      //用户是否存在
      if(tool.isPint(id) && usersModel.length >= id) {
        //验证输入年龄
        var age = parseInt(req.body.age,10);
        if(tool.isPint(age)) {
          var model = usersModel[id-1];
          model.age = age;
          res.status(200).send(model);
        } else {
          res.status(200).send({"msg":"年龄为正整数"});
        }
      } else {
          res.status(404).send('Not Found.');
      }
  });

module.exports = router;
