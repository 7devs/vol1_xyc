var toolTest = function() {
  console.log('toolTest!!!!!!!');
}

var isPint = function(number) {
  return typeof(number) == 'number' && number>0;
}

module.exports.toolTest = toolTest;
module.exports.isPint = isPint;
