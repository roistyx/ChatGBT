StockDao = require("../models/StockNewsDAO");

const { Configuration, OpenAIApi } = require("openai");

class OpenAiInquiryController {
  static async SummarizeOpenAi(req, res) {
    // console.log("Summarizing article content...");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    try {
      const openai = new OpenAIApi(configuration);
      console.log("Summarizing article content...");

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: "summarize to 8th reader level: " + req.body.content,
          },
        ],
      });
      // console.log(response.data.choices[0].message.content);
      req.body.content = response.data.choices[0].message.content;

      return res.status(200).json(req.body);
    } catch (error) {
      console.error("OpenAI Error:", error.message);
    }
  }
}

module.exports = OpenAiInquiryController;
