var server = require('./dist/entry.js');

if(!process.env.PRODUCTION) {
  server.start(2999);
} else {
  server.start(3000);
}
