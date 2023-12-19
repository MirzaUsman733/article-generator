// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// const ChatGptPrompt: React.FC = () => {
//   const [response, setResponse] = useState<string>("");
//   const [prompt, setPrompt] = useState<string>("");
//   const [originalPrompt, setOriginalPrompt] = useState<string>("");
//   const [articleGenerated, setArticleGenerated] = useState<boolean>(false);

//   const fetchOpenAIResponse = async () => {
//     try {
//       if (!prompt.trim()) {
//         return;
//       }

//       const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//       const openaiEndpoint = "https://api.openai.com/v1/completions";

//       const { data } = await axios.post(
//         openaiEndpoint,
//         {
//           model: "gpt-3.5-turbo-instruct",
//           prompt: `generate the most top 5 title and the all titles have must li tag for : "${prompt}" for exam blog post`,
//           temperature: 0,
//           max_tokens: 3896,
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

//       setResponse(data.choices[0].text);
//       setOriginalPrompt(prompt);
//     } catch (error) {
//       console.error("Error fetching OpenAI response:", error);
//     }
//   };

//   const upgradeResponse = async () => {
//     try {
//       if (!originalPrompt.trim()) {
//         return;
//       }

//       const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//       const openaiEndpoint = "https://api.openai.com/v1/completions";

//       const { data } = await axios.post(
//         openaiEndpoint,
//         {
//           model: "gpt-3.5-turbo-instruct",
//           prompt: `generate the most top 5 title and the all titles have must li tag for : "${originalPrompt}" for exam blog post`,
//           temperature: 0,
//           max_tokens: 3896,
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
//       setResponse(data.choices[0].text);
//     } catch (error) {
//       console.error("Error upgrading OpenAI response:", error);
//     }
//   };

//   const generateArticle = async () => {
//     try {
//       if (!response.trim()) {
//         return;
//       }

//       const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//       const openaiEndpoint = "https://api.openai.com/v1/completions";

//       const { data } = await axios.post(
//         openaiEndpoint,
//         {
//           model: "gpt-3.5-turbo-instruct",
//           prompt: `give me the article on each outline and make sure all outline have must  "3 to 4 paragraph" and on each paragraph must have "greater then 90 words and less then 150 words" and the data "format in html tag format" and the total words have must in article always have must  "greater then 2000 and less then 2800" if the words are less then 2000 then ask me "chatgpt is slow and cannot give you perfect data" and the all outline must have h2 tag and at the end give me the conclusion and the outlines are: "${response}" output is in the html format`,
//           temperature: 0,
//           max_tokens: 3800,
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

//       setResponse(data.choices[0].text);
//       setOriginalPrompt(response);
//       setArticleGenerated(true);
//     } catch (error) {
//       console.error("Error generating article:", error);
//     }
//   };

//   return (
//     <div
//       className="container"
//       style={{ margin: "auto", justifyContent: "center" }}
//     >
//       <h1
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         OpenAI Response
//       </h1>
//       <div className="d-flex align-items-center">
//         <label htmlFor="prompt" className="me-4" style={{ fontSize: "18px" }}>
//           Enter the Keyword for given Outlines:{" "}
//         </label>
//         <input
//           disabled={articleGenerated}
//           id="prompt"
//           type="text"
//           placeholder="Enter your prompt..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           className="py-1 rounded border border-primary form-control w-25"
//         />
//         {!originalPrompt && (
//           <button
//             className="btn btn-outline-primary mx-2"
//             onClick={fetchOpenAIResponse}
//           >
//             Fetch Response
//           </button>
//         )}
//         {response && originalPrompt && !articleGenerated && (
//           <button
//             className="btn btn-outline-success mx-2"
//             onClick={upgradeResponse}
//           >
//             Upgrade Response
//           </button>
//         )}
//       </div>
//       {originalPrompt && (
//         <div className="card my-3">
//           {/* <div
//             dangerouslySetInnerHTML={{ __html: originalPrompt }}
//             style={{ marginTop: "10px" }}
//             className="list-group"
//           /> */}
//           <ul style={{ listStyleType: "none" }}>
//             {originalPrompt.split("\n").map((line, index) => (
//               <li style={{ listStyleType: "none" }} key={index}>
//                 {line}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {response && (
//         <div>
//           <div className="text-center">
//             <button
//               className="btn btn-outline-primary"
//               onClick={generateArticle}
//             >
//               Generate Article
//             </button>
//           </div>
//           <div className="card px-4 mt-3">
//             {/* <div
//               dangerouslySetInnerHTML={{ __html: response }}
//               style={{ marginTop: "10px" }}
//             /> */}
//             <ul style={{ listStyleType: "none" }}>
//             {response.split('\n').map((line, index) => (
//               <li style={{ listStyleType: "none",marginTop: '10px' }} key={index}>{line}</li>
//             ))}
//           </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatGptPrompt;

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
      const openaiEndpoint = "https://api.openai.com/v1/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: `generate the most top 10 title and the all titles have must li tag for : "${prompt}" for exam blog post`,
          temperature: 0,
          max_tokens: 3896,
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

      setResponse(data.choices[0].text);
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
      const openaiEndpoint = "https://api.openai.com/v1/completions";

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-3.5-turbo-instruct",
          prompt: `generate the most top 10 title and the all titles have must li tag for : "${originalPrompt}" for exam blog post`,
          temperature: 0,
          max_tokens: 3896,
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
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error("Error upgrading OpenAI response:", error);
    }
  };

//   const generateArticleForTitle = async (selectedTitle: string) => {
//     try {
//       if (!selectedTitle.trim()) {
//         return;
//       }

//       const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//       const openaiEndpoint = "https://api.openai.com/v1/completions";

//       const { data } = await axios.post(
//         openaiEndpoint,
//         {
//           model: "gpt-3.5-turbo-instruct",
//           // prompt: `write the brief article on ${selectedTitle} in which the firstly we create 15 outlines of this title and on each title must have 2 to 4 paragraph that always must have 100% seo base and human written and make the 12 outline of the articles and on each outline must have 2 to 4 paragraph and in each paragraph must have 100 words and the article start on introduction and the data "format in HTML tag format" and the length of the article always must have "greater than 2000 words" and the all sub headings must have h2 tag and at the end give me the conclusion the title of brief article is : "${selectedTitle}" and the article is greater then 3000 words and the  output is in the HTML format`,
//           prompt: `Can you create a 3000 words of brief content on exam product. in which briefly describe some heading that provide me to you. And also add the content that you know ABOUT THE product.
// Here are some point u to also add in content.[
// 1. Introduction of exam
// 2. Journey To Pass Exam
// 3. 5 Benefits to pass exam
// 4. Strategies for Effective Exam Preparation
// 5. 5 Pros and there description
// 6. 5 Cons and there description
// 7. Exam Fees
// 8. Exam Salary
// 9. Important Thing you must to read
// 10. 5 Client testimonials
// 11. 5 Exam policies
// 12. minimum Two paragraph about "brief Conclusion"
// 13. 10 FAQ's
// Also add the 7 to 10 website links in the whole article
// ]
// Create the brief article About This title "${selectedTitle}" output in the html tags `,
//           temperature: 0,
//           max_tokens: 3896,
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

//       setResponse(data.choices[0].text);
//       setOriginalPrompt(selectedTitle);
//       setArticleGenerated(true);
//     } catch (error) {
//       console.error("Error generating article:", error);
//     }
//   };
  // const generateArticle = async () => {
  //   try {
  //     if (!prompt.trim()) {
  //       return;
  //     }

  //     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  //     const openaiEndpoint = "https://api.openai.com/v1/completions";

  //     const { data } = await axios.post(
  //       openaiEndpoint,
  //       {
  //         model: "gpt-3.5-turbo-instruct",
  //         prompt: `give me the article on each outline and make sure all outline have must "3 to 4 paragraph" and on each paragraph must have "greater than 90 words and less than 150 words" and the data "format in HTML tag format" and the total words have must in the article always have must "greater than 2000 and less than 2800" if the words are less than 2000 then ask me "ChatGPT is slow and cannot give you perfect data" and the all outline must have h2 tag and at the end give me the conclusion and the outlines are: "${prompt}" output is in the HTML format`,
  //         temperature: 0,
  //         max_tokens: 3800,
  //         top_p: 1,
  //         frequency_penalty: 0,
  //         presence_penalty: 0,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       }
  //     );

  //     setResponse(data.choices[0].text);
  //     setOriginalPrompt(prompt);
  //     setArticleGenerated(true);
  //   } catch (error) {
  //     console.error("Error generating article:", error);
  //   }
  // };

  
















// const generateArticleForTitle = async (selectedTitle: string) => {
//   try {
//     if (!selectedTitle.trim()) {
//       return;
//     }

//     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
//     const openaiEndpoint = "https://api.openai.com/v1/completions";

//     const prompts = [
//       `write the content for article without conclusion on Introduction of exam on "${selectedTitle}" and the content is less then 300 words  and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand on Journey To Pass Exam on "${selectedTitle}" and the content is in paragraph is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Benefits to pass exam on "${selectedTitle}" and the content is in paragraph is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Strategies for Effective Exam Preparation on "${selectedTitle}" and the content is in paragraph that is always less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Pros on "${selectedTitle}" and the content is in paragraph that always must have less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Cons on "${selectedTitle}" and the content is in paragraph that always must have less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam Fees on "${selectedTitle}" and the content is in paragraph that always must have less then 200 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam Salary on "${selectedTitle}" and the content is in paragraph that always must have less then 200 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Important Thing you must to read on "${selectedTitle}" and the content is in paragraph that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Client testimonials on "${selectedTitle}" and the content that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam policies on "${selectedTitle}" and the content is in paragraph that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on 5 FAQ's on "${selectedTitle}" and the content that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//       `write the 7 to 10 website links don't write anything like heading on "${selectedTitle}" and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
//     ];

//     const responses: string[] = [];

//    let uniqueHeadings: Set<string> = new Set();

//     for (const prompt of prompts) {
//       const { data } = await axios.post(
//         openaiEndpoint,
//         {
//           model: "gpt-3.5-turbo-instruct",
//           prompt,
//           temperature: 0,
//           max_tokens: 3896,
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

//       const responseText = data.choices[0].text;

//       // Extract headings (assumes headings start with "<h2>")
//       const extractedHeadings = responseText.match(/<h2>(.*?)<\/h2>/g);
//       if (extractedHeadings) {
//         uniqueHeadings = new Set([...uniqueHeadings, ...extractedHeadings]);
//       }
//     }

//     const uniqueArticle = response.replace(/<h2>(.*?)<\/h2>/g, (match, p1) => {
//       return uniqueHeadings.has(match) ? match : "";
//     });

//     setResponse(uniqueArticle);
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
    const openaiEndpoint = "https://api.openai.com/v1/completions";

    const prompts = [
      `write the content for article without conclusion on Introduction of exam on "${selectedTitle}" and the content is less then 300 words  and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand on Journey To Pass Exam on "${selectedTitle}" and the content is in paragraph is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Benefits to pass exam on "${selectedTitle}" and the content is in paragraph is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Strategies for Effective Exam Preparation on "${selectedTitle}" and the content is in paragraph that is always less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Pros on "${selectedTitle}" and the content is in paragraph that always must have less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Cons on "${selectedTitle}" and the content is in paragraph that always must have less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam Fees on "${selectedTitle}" and the content is in paragraph that always must have less then 200 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam Salary on "${selectedTitle}" and the content is in paragraph that always must have less then 200 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Important Thing you must to read on "${selectedTitle}" and the content is in paragraph that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Client testimonials on "${selectedTitle}" and the content that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on Exam policies on "${selectedTitle}" and the content is in paragraph that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the content in paragraph don't write anything like introduction and conclusion and understand and common heading on 5 FAQ's on "${selectedTitle}" and the content that always must have is less then 250 words and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
      `write the 7 to 10 website links don't write anything like heading on "${selectedTitle}" and the data format always must have "in HTML tag format" that always must have 100% seo base and human written and the data format always must have "in HTML tag format" and the all subheadings must have h2 tag`,
    ];
    let uniqueHeadings: Set<string> = new Set();
    let uniqueContent: Set<string> = new Set();

    for (const prompt of prompts) {
      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-3.5-turbo-instruct",
          prompt,
          temperature: 0,
          max_tokens: 3896,
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

      const responseText = data.choices[0].text;

      // Extract headings (assumes headings start with "<h2>")
      const extractedHeadings = responseText.match(/<h2>(.*?)<\/h2>/g);
      if (extractedHeadings) {
        uniqueHeadings = new Set([...uniqueHeadings, ...extractedHeadings]);
      }

      // Extract content
      const extractedContent = responseText.replace(/<h2>.*?<\/h2>/g, '').trim();
      uniqueContent.add(extractedContent);
    }

    const uniqueArticle = Array.from(uniqueHeadings)
      .map((heading) => `<h2>${heading}</h2>`)
      .join('') + Array.from(uniqueContent).join('');

    setResponse(uniqueArticle);
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
