import { Configuration,OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: " do not use process.env.OPENAI_API_KEY, just put your key here",
})

const openai = new OpenAIApi(configuration);

export default openai;