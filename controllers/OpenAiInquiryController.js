// Purpose: OpenAiInquiryController handles all requests that are related to OpenAiInquiry.

const { Configuration, OpenAIApi } = require("openai");

class OpenAiInquiryController {
  static async SummarizeOpenAi(req, res) {
    console.log("Req", req.body.content);

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
      console.log(response.data.choices[0].message.content);

      return res
        .status(200)
        .json({ text: response.data.choices[0].message.content });
    } catch (error) {
      console.error("OpenAI Error:", error.message);
    }
  }
}

module.exports = OpenAiInquiryController;
