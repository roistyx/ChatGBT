// Purpose: OpenAiInquiryController handles all requests that are related to OpenAiInquiry.

const { Configuration, OpenAIApi } = require("openai");

class OpenAiExtractController {
  static async ExtractOpenAi(req, res) {
    console.log("req.articleContent:", req.articleContent);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    try {
      const openai = new OpenAIApi(configuration);

      //   const response = await openai.createCompletion({
      //     model: "text-davinci-003",
      //     prompt: `Remove none-textual code and return clean text: ${req.articleContent}`,
      //     temperature: 1,
      //     max_tokens: 256,
      //     top_p: 1,
      //     frequency_penalty: 0,
      //     presence_penalty: 0,
      //   });

      const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `Return clean text: ${req.articleContent}`,
          },
        ],
      });
      console.log(response.data.choices[0].text);
      return res.status(200).json({ text: response.data.choices[0].text });
    } catch (error) {
      console.error("Error in OpenAI request:", error.message);
    }
  }
}

module.exports = OpenAiExtractController;
