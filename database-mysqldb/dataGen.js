const faker = require('faker');
const file = require('fs').createWriteStream('./fakeData.csv');

const date = new Date().toLocaleTimeString();

const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const companies = new Set();

const numToseed = 1000000;

/* Generating 100 hard coded tickers for testing data integrity across team components


const companyData = [
    { id: '001', ticker: 'SNAP', company: 'Snap' },
    { id: '002', ticker: 'TSLA', company: 'Tesla' },
    { id: '003', ticker: 'AMZN', company: 'Amazon'},
    { id: '004', ticker: 'TWTR', company: 'Twitter' },
    { id: '005', ticker: 'BABA', company: 'Alibaba' },
    { id: '006', ticker: 'BAC', company: 'Bank of America'},
    { id: '007', ticker: 'NFLX', company: 'Netflix' },
    { id: '008', ticker: 'NVDA', company: 'NVIDIA'},
    { id: '009', ticker: 'DIS', company: 'Disney' },
    { id: '010', ticker: 'PLUG', company:     'Plug Power'},
    { id: '011', ticker: 'SQ', company:   'Square'},
    { id: '012', ticker: 'ZNGA', company: 'Zynga'},
    { id: '013', ticker: 'CHK', company: 'Chesapeake Energy'},
    { id: '014', ticker: 'NIO', company:  'NIO'},
    { id: '015', ticker: 'T', company:    'AT&T'},
    { id: '016', ticker: 'HEXO', company:     'Hexo'},
    { id: '017', ticker: 'MU', company:   'Micron Technology'},
    { id: '018', ticker: 'GRPN', company:     'Groupon'},
    { id: '019', ticker: 'SBUX', company:     'Starbucks' },
    { id: '020', ticker: 'APHA', company:     'Aphria'},
    { id: '021', ticker: 'RAD', company:  'Rite Aid'},
    { id: '022', ticker: 'SIRI', company:     'Sirius XM'},
    { id: '023', ticker: 'ATVI', company:     'Activision Blizzard'},
    { id: '024', ticker: 'NTDOY', company:    'Nintendo'},
    { id: '025', ticker: 'NKE', company:  'Nike'},
    { id: '026', ticker: 'INTC', company:     'Intel'},
    { id: '027', ticker: 'IQ', company:   'iQIYI'},
    { id: '028', ticker: 'VOO', company:  'Vanguard'},
    { id: '029', ticker: 'S', company:    'Sprint'},
    { id: '030', ticker: 'WFT', company:  'Weatherford'},
    { id: '031', ticker: 'KO', company:   'Coca-Cola'},
    { id: '032', ticker: 'BRK', company: 'Berkshire Hathaway'},
    { id: '033', ticker: 'TLRY', company:     'Tilray'},
    { id: '034', ticker: 'BA', company:   'Boeing'},
    { id: '035', ticker: 'MJ', company:   'ETFMG Alternative Harvest'},
    { id: '036', ticker: 'JD', company:   'JD.com'},
    { id: '037', ticker: 'V', company:    'Visa'},
    { id: '038', ticker: 'AUY', company:  'Yamana Gold'},
    { id: '039', ticker: 'SPY', company:  'SPDR'},
    { id: '040', ticker: 'GERN', company:     'Geron'},
    { id: '041', ticker: 'PYPL', company:     'PayPal'},
    { id: '042', ticker: 'TCEHY', company:    'Tencent'},
    { id: '043', ticker: 'GOOGL', company:    'Alphabet'},
    { id: '044', ticker: 'CSCO', company:     'Cisco'},
    { id: '045', ticker: 'CRM', company:  'Salesforce'},
    { id: '046', ticker: 'ROKU', company:     'Roku'},
    { id: '047', ticker: 'CRBP', company:     'Corbus Pharmaceuticals'},
    { id: '048', ticker: 'DBX', company:  'Dropbox'},
    { id: '049', ticker: 'WMT', company:  'Walmart'},
    { id: '050', ticker: 'JCP', company:  'J.C. Penney'},
    { id: '051', ticker: 'GM', company:   'GM'},
    { id: '052', ticker: 'VTI', company:  'Vanguard Total'},
    { id: '053', ticker: 'BILI', company:     'Bilibili'},
    { id: '054', ticker: 'NOK', company:  'Nokia'},
    { id: '055', ticker: 'GLUU', company:     'Glu Mobile'},
    { id: '056', ticker: 'VZ', company:   'Verizon'},
    { id: '057', ticker: 'VSLR', company:     'Vivint Solar'},
    { id: '058', ticker: 'SHOP', company:     'Shopify'},
    { id: '059', ticker: 'CARA', company:     'Cara Therapeutics'},
    { id: '060', ticker: 'SNE', company:  'Sony'},
    { id: '061', ticker: 'PFE', company:  'Pfizer'},
    { id: '062', ticker: 'ENPH', company:     'Enphase Energy'},
    { id: '063', ticker: 'CVS', company:  'CVS'},
    { id: '064', ticker: 'SPOT', company:     'Spotify'},
    { id: '065', ticker: 'COST', company:     'Costco'},
    { id: '066', ticker: 'TRXC', company:     'TransEnterix'},
    { id: '067', ticker: 'TWLO', company:     'Twilio'},
    { id: '068', ticker: 'PCG', company:  'PG&E'},
    { id: '069', ticker: 'KHC', company:  'Kraft Foods'},
    { id: '070', ticker: 'INSY', company: 'Insys Therapeutics'},
    { id: '071', ticker: 'AKS', company:  'AK Steel'},
    { id: '072', ticker: 'LUV', company:  'Southwest Airlines'},
    { id: '073', ticker: 'CRSP', company: 'CRISPR'},
    { id: '074', ticker: 'FDX', company:  'FeDex'},
    { id: '075', ticker: 'VKTX', company: 'Viking Therapeutics'},
    { id: '076', ticker: 'JPM', company:  'JPMorgan Chase'},
    { id: '077', ticker: 'DNR', company:  'Denbury'},
    { id: '078', ticker: 'SPWR', company: 'SunPower'},
    { id: '079', ticker: 'UAA', company:  'Under Armour'},
    { id: '080', ticker: 'BOTZ', company: 'Global X Robotics'},
    { id: '081', ticker: 'SFIX', company: 'Stitch Fix'},
    { id: '082', ticker: 'AMAT', company: 'Applied Materials'},
    { id: '083', ticker: 'YETI', company: 'YETI'},
    { id: '084', ticker: 'EA', company:   'EA'},
    { id: '085', ticker: 'QCOM', company: 'Qualcomm'},
    { id: '086', ticker: 'TGT', company:  'Target'},
    { id: '087', ticker: 'TEVA', company: 'Teva Pharmaceutical'},
    { id: '088', ticker: 'JNJ', company:  'Johnson & Johnson'},
    { id: '089', ticker: 'IIPR', company: 'Innovative Industrial Properties'},
    { id: '090', ticker: 'ACB', company:  'Aurora Cannabis'},
    { id: '091', ticker: 'GE', company:   'GE' },
    { id: '092', ticker: 'AAPL', company: 'Apple' },
    { id: '093', ticker: 'F', company:    'Ford' },
    { id: '094', ticker: 'CRON', company: 'Cronos Group'},
    { id: '095', ticker: 'MSFT', company: 'Microsoft' },
    { id: '096', ticker: 'GPRO', company: 'GoPro' },
    { id: '097', ticker: 'FIT', company:  'Fitbit' },
    { id: '098', ticker: 'AMD', company:  'AMD'},
    { id: '099', ticker: 'FB', company:   'Facebook' },
    { id: '100', ticker: 'CGC', company:  'Canopy Growth'}
  ];
  const generateTickers = digits => {
    const allTickers = companyData.map(val => val.ticker);
    const validator = new Set(allTickers);
    const tickerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    (function loop(base, i){
      for (let k = 0; k < tickerChars.length; k++) {
        if (i > 1) loop( base + tickerChars[k], i-1);
        else if (!validator.has(base + tickerChars[k])) {
          allTickers.push( base + tickerChars[k]);
        } 
      }
    })("", digits);
    return allTickers;
  }

  */

const mapTicker = () => {
  let company = '';
  for (let i = 0; i <= 4; i++) {
    company += tickerChars.charAt(Math.floor(Math.random() * tickerChars.length));
  }
  if (!companies.has(company)) {
    if (company === undefined) {
      return assignCompanies();
    }
    companies.add(company);
    return company;
  }
  return mapTicker();
};

const createFakeStock = () => ({
  ask_price: faker.finance.amount(100, 1500, 6),
  ask_size: faker.random.number({ min: 100, max: 500 }),
  bid_price: faker.finance.amount(100, 2000, 6),
  bid_size: faker.random.number({ min: 100, max: 500 }),
  last_extended_hours_trade_price: faker.finance.amount(100, 2000, 6),
  last_trade_price: faker.finance.amount(100, 2000, 6),
  symbol: mapTicker(),
  quantity: faker.finance.amount(1, 500, 4),
  createdAt: date,
  updatedAt: date,
});

const generateStocks = () => {
  return createFakeStock();
};

const convertArrayofObjectsToCSV = (data, count) => {
  let result = '';
  if (count === numToseed) {
    result += 'ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity,createdAt,updatedAt\n';
  }
  for (var property in data) {
    result += data[property] + ',';
  }
  result = result.slice(0, -1);
  return result + '\n';
}


function writeRecords(writer, encoding, callback) {
  let i = numToseed;
  write(); 
  function write() {
    let ok = true; 
    do {
      const stockData = (convertArrayofObjectsToCSV(generateStocks(), i));
      i--; 
      if (i === 0) {
        process.stdout.write(stockData, encoding, callback );
      } else {
        ok = process.stdout.write(stockData, encoding)
      }
    } while (i > 0 && ok);
    if (i > 0) {
      process.stdout.once('drain', write);
    }
  }
}

writeRecords(file, 'utf8', () => { console.error('Done'); });