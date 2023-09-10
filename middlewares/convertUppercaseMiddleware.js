const convertToUppercaseMiddleware = (req, res, next) => {
  const symbol = req.params.symbol;
  req.params.symbol = symbol.toUpperCase();
  next();
};

module.exports = convertToUppercaseMiddleware;
