var app = require('express')(),
    bodyParser = require('body-parser'),
    tool = require('./lib/tool.js');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api',require('./lib/routers/api'));

app.use('/*',function(req,res,next){
  res.status(404).send('Not Found.');
})

app.listen(3000,function() {
    tool.toolTest();
});
