import { HfInference, InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and
 suggests a recipe they could make with some or all of those ingredients. You don't need to use every
  ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention,
   but try not to include too many extra ingredients. Format your response in markdown to make it easier 
   to render to a web page
`;

// Make sure to set REACT_APP_HF_ACCESS_TOKEN in your .env file
// For Vite projects, use import.meta.env; for Create React App, process.env is correct.
// If using Vite:
const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;
const hf = new InferenceClient(HF_ACCESS_TOKEN);
console.log(HF_ACCESS_TOKEN);
// If using Create React App, ensure 'process.env' is available and your environment variable is prefixed with REACT_APP_

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have the following ingredients: ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
  }
}
