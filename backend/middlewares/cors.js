module.exports = (req, res, next) => {
  const allowedCors = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://umarishki.mesto-front.nomoredomains.xyz',
    'https://umarishki.mesto-front.nomoredomains.xyz',
  ];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  return next();
};
