var http = require('http');

http.createServer(require('./app'))
  .listen(8080, function(){
  console.log('Server is running...');
});
