const app = require('./server.js');
require('dotenv').config();

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});
