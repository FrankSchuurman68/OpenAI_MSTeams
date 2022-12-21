import React from "react";
import { useState } from "react";
import styles from "./chat.module.css";


export function Chat() {
  const [input, setinput] = useState("");
  const [result, setResult] = useState();
  const [gif, setGif] = useState();

  const { REACT_APP_OPENAI_API_KEY } = "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";
  async function onSubmit(event) {
    //show loading icon while waiting for response
    setResult(<img src="/loading.gif" alt="loading"/>);

    event.preventDefault();
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `${input}`,
        temperature: .6,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1, 
    })
    });
    const data = await response.json();
    console.log(data);
    setResult(data.choices[0].text);
    //If text result contains "Jules" then show gif
    if (data.choices[0].text.includes("Jules")) {
      setGif(<iframe title="gif" src="https://giphy.com/embed/3otPowzRBqAi3h9uM0" width="480" height="204" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>);
    }
    setinput("");
  }

  return (
    <div>
      {gif}
      <div className={styles.results}>{result}</div>
      <main className={styles.main}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Stel je vraag?"
            value={input}
            onChange={(e) => setinput(e.target.value)}
          />
          <input type="submit" value="Vraag" />
        </form>
      </main>
    </div>
  );
}
