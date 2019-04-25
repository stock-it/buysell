var csv = require('csv-parser')
var fs = require('fs')
var fetch = require('node-fetch')

// DB Setup
var pg = require('pg');
pg.defaults.ssl = true;
const Sequelize = require('sequelize');
const db = require('./Stock');
// const sequelize = new Sequelize(db);
const sequelize = new Sequelize('stocks', '', '', { // <- make sure to change password and input from a config file
    host: 'localhost', // <- update host
    dialect: 'postgres',
    port: 5432,
    define: {
      timestamps: false,
    },
});

// Stock Model Model
const Stock = require('./database-postgres/Stocks');

// Authenticate Postgres Server.
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    fs.createReadStream('./testData-1k.csv')
    .pipe(csv())
    .on('data', function (data) {
    fetch("https://api.iextrading.com/1.0/stock/" + data.symbol + "/quote")
    .then(res => res.json())
    .then(function(json) {
        Stock.create({
            symbol: String,	
            companyName: String,
            primaryExchange: String,
            sector:	String,	
            calculationPrice: String	,
            open: Number,
            openTime: Number,
            close: Number,
        });
    });
    });
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });



// closeTime	number	refers to the official listing exchange time for the close
// high	number	refers to the market-wide highest price from the SIP. 15 minute delayed
// low	number	refers to the market-wide lowest price from the SIP. 15 minute delayed
// latestPrice	number	refers to the latest price being the IEX real time price, the 15 minute delayed market price, or the previous close price.
// latestSource	string	refers to the source of latestPrice. 
// ("IEX real time price", "15 minute delayed price", "Close" or "Previous close")
// latestTime	string	refers to a human readable time of the latestPrice. The format will vary based on latestSource.
// latestUpdate	number	refers to the update time of latestPrice in milliseconds since midnight Jan 1, 1970.
// latestVolume	number	refers to the total market volume of the stock.
// iexRealtimePrice	number	refers to last sale price of the stock on IEX. (Refer to the attribution section above.)
// iexRealtimeSize	number	refers to last sale size of the stock on IEX.
// iexLastUpdated	number	refers to the last update time of the data in milliseconds since midnight Jan 1, 1970 UTC or -1 or 0. If the value is -1 or 0, IEX has not quoted the symbol in the trading day.
// delayedPrice	number	refers to the 15 minute delayed market price during normal market hours 9:30 - 16:00.
// delayedPriceTime	number	refers to the time of the delayed market price during normal market hours 9:30 - 16:00.
// extendedPrice	number	refers to the 15 minute delayed market price outside normal market hours 8:00 - 9:30 and 16:00 - 17:00.
// extendedChange	number	is calculated using extendedPrice from calculationPrice.
// extendedChangePercent	number	is calculated using extendedPrice from calculationPrice.
// extendedPriceTime	number	refers to the time of the delayed market price outside normal market hours 8:00 - 9:30 and 16:00 - 17:00.
// change	number	is calculated using calculationPrice from previousClose.
// changePercent	number	is calculated using calculationPrice from previousClose.
// iexMarketPercent	number	refers to IEX’s percentage of the market in the stock.
// iexVolume	number	refers to shares traded in the stock on IEX.
// avgTotalVolume	number	refers to the 30 day average volume on all markets.
// iexBidPrice	number	refers to the best bid price on IEX.
// iexBidSize	number	refers to amount of shares on the bid on IEX.
// iexAskPrice	number	refers to the best ask price on IEX.
// iexAskSize	number	refers to amount of shares on the ask on IEX.
// marketCap	number	is calculated in real time using calculationPrice.
// peRatio	number	is calculated in real time using calculationPrice.
// week52High	number	refers to the adjusted 52 week high.
// week52Low	number	refers to the adjusted 52 week low.
// ytdChange	number	refers to the price change percentage from start of year to previous close.