import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe({ recipe }) {
  console.log("ClaudeRecipe component rendered with recipe:", recipe);
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown children={recipe} />
    </section>
  );
}
