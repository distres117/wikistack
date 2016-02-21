var http = require('http');

http.createServer(require('./app'))
  .listen(3000, function(){
  console.log('Server is running...');
});
