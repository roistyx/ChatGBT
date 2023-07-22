const axios = require("axios");
const cheerio = require("cheerio");

const getArticleContent = async (req, res, next) => {
  const url = req.body.url;

  req.userInput = url;
  // console.log("Article content loaded.", req.articleContent);
  next();
};

module.exports = getArticleContent;
