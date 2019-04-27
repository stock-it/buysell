const router = require('express').Router();
// const stockController = require('../controllers/index.js');

router.get('/stocks/:ticker', (req, res) => {
  controller.getStockInfo(req.params.ticker)
    .then((stockData) => {
      res.status(200);
      res.send(stockData);
    });
});

router.get('/api/accounts/:account_number', (req, res) => {
  controller.getAccountInfo(req.params.account_number)
    .then((accountData) => {
      res.status(200);
      res.send(accountData);
    }); 
});

// app.patch('/api/stocks/:account_number', (req, res) => {
//   controller.getAccountInfo(req.params.account_number)
//   .then((accountData) => {
//     res.status(200);
//     res.send(accountData);
//   }); 
// });


// var retrieveAll = function()  {
//   var query = 'SELECT * FROM tmp';
//   client.query(query, (err, res) => {
//     if(err) {
//       console.log(err.stack)
//     } else{
//       console.log(res);
//     }
//   });
// };


// // var insertValue = [5];
// var insertQuery = function (insertValue) {
//   var query = 'INSERT INTO tmp (id) values ('+ insertValue +') returning * ';
//   client.query(query, (err, res) => {
//     if (err) {
//     console.log(err.stack)
//     } else {
//       console.log(res.rows[0]);
//     }
//   });
// };

// var updateQuery = function (updateSetValue, updateQualifierValue)  {
//   var query = "UPDATE tmp SET id = "+ updateSetValue+" WHERE id = "+updateQualifierValue + " returning *";
//   client.query(query, (err, res) => {
//     if (err) {
//     console.log(err.stack)
//     } else {
//       console.log(res.rows[0]);
//     }
//   });
// }
// var deleteQuery = function(deleteId)  {
//   client.query('DELETE from tmp WHERE id = $1', [deleteId], (err, res) => {
//     if (err) {
//       console.log(err.stack)
//       } else {
//         console.log("record id:"+deleteId+" deleted");
//       }
//   });
// }

module.exports = router;
