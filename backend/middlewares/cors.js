const cors = require('cors');

const allowList = [
  'https://mesto-kris.nomoredomains.icu/',
  'http://mesto-kris.nomoredomains.icu/',
  'http://localhost:3000/',
];

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
    // if (allowList.indexOf(origin) !== -1 || !origin) {
    //   callback(null, true);
    // } else {
    //   callback(new Error('Не разрешено CORS'));
    // }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
  credentials: true,
};

module.exports = { cors: cors(corsOptions) };
