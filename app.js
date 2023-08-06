require("dotenv").config();
const express = require("express");
const cors = require("cors");

const OpenAiInquiryController = require("./controllers/OpenAiInquiryController");
const extractArticleMiddleware = require("./middlewares/extractArticleMiddleware");
const OpenAiPromptController = require("./controllers/OpenAiPromptController");
const path = require("path");
const YahooFinanceController = require("./controllers/YahooFinanceController");
const datesValidationMiddleware = require("./middlewares/dateFormatMiddleware");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));

app.post(
  "/extract",
  extractArticleMiddleware,
  OpenAiInquiryController.SummarizeOpenAi
);

app.post("/historical", datesValidationMiddleware, YahooFinanceController.HistoricalData);

// app.use(OpenAiPromptController.PromptLine);

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});
