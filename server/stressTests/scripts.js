const http = require('k6/http');
const { check } = require('k6');

export const options = {
  vus: 100,
  duration: "15m"
};

export default function() {
  const res = http.get("http://127.0.0.1:5000/api/stocks/AITHK");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 2000
  });
};
