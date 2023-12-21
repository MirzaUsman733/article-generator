"use client";
import React, { useState } from "react";
import axios from "axios";
const ChatGptPrompt: React.FC = () => {
  const [response, setResponse] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [articleGenerated, setArticleGenerated] = useState<boolean>(false);

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
              content: `write the 10 titles on "${prompt}" the title are fully seo based`,
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
              content: `write the 10 titles on "${prompt}" the title are fully seo based`,
            },
            // {
            //   role: "assistant",
            //   content:
            //     "I. Introduction \n   A. Explanation of AZ-900 Microsoft Azure Fundamentals\n   B. Importance of acquiring this Microsoft certification\n\nII. Understanding Microsoft Azure \n   A. Understanding cloud concepts \n   B. Overview of Azure services \n   C. Managing Azure subscriptions \n\nIII. Azure Architecture\n   A. Comprehension of Azure architecture concepts\n   B. Learning about Azure resources and resource groups\n   C. Overview of Azure cloud computing model\n\nIV. Core Azure Services \n   A. Description of core Azure services\n   B. Azure compute products \n   C. Network products in Azure\n   D. Storage products in Azure\n   E. AI & Machine Learning products in Azure\n   F. IoT services in Azure \n\nV. Azure Security & Compliance \n   A. Understanding Azure security \n   B. Knowledge of Azure compliance \n   C. An overview of Azure identity services \n\nVI. Azure Pricing and Support \n   A. Understanding Azure Service Level Agreements (SLAs)\n   B. Pricing and purchasing options in Azure \n   C. Factors affecting costs in Azure\n   D. Azure support plans \n\nVII. Exam Preparation \n   A. Detailed overview of the AZ-900 exam \n   B. Study tips for passing the AZ-900 exam \n   C. Practice questions \n   D. Resources for exam preparation \n   \nVIII. Conclusion \n   A. Recap of the AZ-900 certification exam guide\n   B. Encouragement for the exam preparation journey\n   C. Final tips for exam day.",
            // },
            // {
            //   role: "user",
            //   content: "on that 1st outline give me the content of 500 words\n",
            // },
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

  // const generateArticleForTitle = async (selectedTitle: string) => {
  //   try {
  //     if (!selectedTitle.trim()) {
  //       return;
  //     }

  //     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  //     const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

  //     const prompts = [
  //       `write the content on 1st outline`,
  //       `write the content on 2nd outline`,
  //       `write the content on 3rd outline`,
  //     ];

  //     const responses: string[] = [];

  //     // for (const prompt of prompts) {
  //       const { data } = await axios.post(
  //         openaiEndpoint,
  //         {
  //           model: "gpt-4",
  //           messages: [
  //             {
  //               role: "user",
  //               content: `write the 10 outline on:  "${selectedTitle}" only give me outlines not sub outlines`,
  //             },
  //             {
  //               role: "user",
  //               content:
  //                 "do you have chat stream?",
  //             },
  //           ],
  //           temperature: 0,
  //           max_tokens: 7200,
  //           top_p: 1,
  //           frequency_penalty: 0,
  //           presence_penalty: 0,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${apiKey}`,
  //           },
  //         }
  //       );

  //       responses.push(data.choices[0].message.content);
  //     // }

  //     setResponse(responses.join("\n"));
  //     setOriginalPrompt(selectedTitle);
  //     setArticleGenerated(true);
  //   } catch (error) {
  //     console.error("Error generating article:", error);
  //   }
  // };

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
            content: `write the 10 outline on:  "${selectedTitle}" only give me outlines not sub outlines`,
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
              content: `write the content as an IT Expert and the outline is show on the top in h2 tag for:  "${outline}" in 300 words that is 15 year old understandable output in the html tags`,
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
              <li style={{ listStyleType: "none" }} key={index}>
                {line}
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
          {/* <ul style={{ listStyleType: "none" }}>
            {response.split("\n").map((line, index) => (
              <li
                style={{ listStyleType: "none", marginTop: "10px" }}
                key={index}
              >
                {line}
              </li>
            ))}
          </ul> */}
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
