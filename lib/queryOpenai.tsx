import openai from "./chatgpt";

const queryOpenai = async (prompt: string, chatId: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      // temperature: 0.4,
      // max_tokens: 2000,
      // top_p: 1,
      // frequency_penalty: 0.0,
      // presence_penalty: 0.0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => console.log(err));
  return res;
};
export default queryOpenai;
