// Purpose: OpenAiInquiryController handles all requests that are related to OpenAiInquiry.

const { Configuration, OpenAIApi } = require("openai");

class OpenAiInquiryController {
  static async SummarizeOpenAi(req, res) {
    const token = req.body.token;

    console.log("Summarizing article content...");

    const configuration = new Configuration({
      apiKey: token,
    });
    try {
      const openai = new OpenAIApi(configuration);

      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: req.userInput,
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
