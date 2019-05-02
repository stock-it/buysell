const http = require('k6/http');

export let options = {
  vus: 100,
  duration: "60s"
};

export default function() {
  http.get(`http://localhost:5000/api/stocks/${Math.floor(Math.random() * 100 + 8000000)}`);
};