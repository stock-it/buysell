const http = require('k6/http');
const { check } = require('k6');

export const options = {
  vus: 100,
  duration: "180s"
};

export default function() {
  const res = http.get(`http://localhost:5000/api/stocks/${Math.floor(Math.random() * 100 + 8000000)}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};
