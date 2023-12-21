"use client";
import React, { useState } from "react";
import axios from "axios";
const ChatGptPrompt: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [articleGenerated, setArticleGenerated] = useState<boolean>(false);
  const [outlines, setOutlines] = useState<string[]>([]);
  const fetchOpenAIResponse = async () => {
    try {
      if (!prompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based and it must have cannot start with any number`,
            },
          ],
          temperature: 0,
          max_tokens: 7193,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(data.choices[0].message.content);
      console.log(response);
      setOriginalPrompt(prompt);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

  const upgradeResponse = async () => {
    try {
      if (!originalPrompt.trim()) {
        return;
      }

      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the 10 titles that cannot start with the numbers on "${prompt}" the title are fully seo based`,
            },
          ],
          temperature: 0,
          max_tokens: 7193,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setResponse(data.choices[0].message.content);
      console.log(response);
      setOriginalPrompt(prompt);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }
  };

const generateArticleForTitle = async (selectedTitle: string) => {
  try {
    if (!selectedTitle.trim()) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

    // Step 1: Get outlines
    const { data: outlinesData } = await axios.post(
      openaiEndpoint,
      {
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content: `write the 10 outline that cannot start with the numbers on:  "${selectedTitle}" only give me outlines not sub outlines`,
          },
        ],
        temperature: 0,
        max_tokens: 7200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
      console.log(outlinesData.choices[0].message.content.split("\n"));
    const outlines = outlinesData.choices[0].message.content.split("\n");
    setOutlines(outlines);
    // Step 2: Get content for each outline
    const responses: string[] = [];

    for (const outline of outlines) {
      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [
            {
              role: "user",
              content: `write the content as an IT Expert and the outline is show on the top in h2 tag and the outline heading cannot be start with number for:  "${outline}" in 300 words that is 15 year old understandable output in the html tags`,
            },
          ],
          temperature: 0,
          max_tokens: 7200,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log(data.choices[0].message.content)
      responses.push(data.choices[0].message.content);
    }

    // Display all assistant data on the screen
    setResponse(responses.join("\n"));
    setOriginalPrompt(selectedTitle);
    setArticleGenerated(true);
  } catch (error) {
    console.error("Error generating article:", error);
  }
};

  return (
    <div
      className="container"
      style={{ margin: "auto", justifyContent: "center" }}
    >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        OpenAI Response
      </h1>
      <div className="d-flex align-items-center">
        <label htmlFor="prompt" className="me-4" style={{ fontSize: "18px" }}>
          Enter the Keyword for given Outlines:{" "}
        </label>
        <input
          disabled={articleGenerated}
          id="prompt"
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="py-1 rounded border border-primary form-control w-25"
        />
        {!originalPrompt && (
          <button
            className="btn btn-outline-primary mx-2"
            onClick={fetchOpenAIResponse}
          >
            Fetch Response
          </button>
        )}
        {response && originalPrompt && !articleGenerated && (
          <button
            className="btn btn-outline-success mx-2"
            onClick={upgradeResponse}
          >
            Upgrade Response
          </button>
        )}
      </div>
      {originalPrompt && (
        <div className="card my-3">
          <ul style={{ listStyleType: "none" }}>
            {originalPrompt.split("\n").map((line, index) => (
              <h1 key={index}>{line}</h1>
            ))}
          </ul>
        </div>
      )}
      {articleGenerated && outlines.length > 0 && (
        <div>
          <h2>Table of content:</h2>
          <ul className="list-group list-group-flush">
            {outlines.map((outline, index) => (
              <li
                className="list-group-item list-group-item-secondary"
                key={index}
                style={{
                  listStyleType: "none",
                  // margin: "10px 0",
                }}
              >
                {outline}
              </li>
            ))}
          </ul>
        </div>
      )}
      {response && !articleGenerated && (
        <div>
          <h2>Generated Titles:</h2>
          <ul>
            {response.split("\n").map((title, index) => (
              <li
                key={index}
                style={{
                  listStyleType: "none",
                  cursor: "pointer",
                  margin: "10px 0",
                }}
                onClick={() => generateArticleForTitle(title)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {articleGenerated && (
        <div className="card px-4 mt-3">
          <div
            dangerouslySetInnerHTML={{ __html: response }}
            style={{ marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatGptPrompt;
