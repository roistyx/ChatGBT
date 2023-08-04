require("dotenv").config();
const express = require("express");
const OpenAiInquiryController = require("./controllers/OpenAiInquiryController");
const extractArticleMiddleware = require("./middlewares/extractArticleMiddleware");
const OpenAiPromptController = require("./controllers/OpenAiPromptController");
const path = require("path");
const YahooFinanceController = require("./controllers/YahooFinanceController");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post(
  "/extract",
  extractArticleMiddleware,
  OpenAiInquiryController.SummarizeOpenAi
);

// app.post("/historical", YahooFinanceController.HistoricalData);
app.post("/historical", (req, res) => {
  console.log("req.body", req);
});

app.use(OpenAiPromptController.PromptLine);

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});
