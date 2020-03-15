// @desc logs request to consoles
const logger = (req, res, next) => {
  const { method, protocol, originalUrl } = req;
  const host = req.get("host");

  console.log(`${method} ${protocol}://${host}${originalUrl}`);

  next();
};

module.exports = logger;
