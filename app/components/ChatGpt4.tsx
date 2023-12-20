// 'use client'
// import { useEffect, useState } from 'react';
// import OpenAI from 'openai';

// const ChatGpt4 = () => {
//   const [articleContent, setArticleContent] = useState<string>('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const openai = new OpenAI({
//           apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//           dangerouslyAllowBrowser: true,
//         });

//         const response = await openai.chat.completions.create({
//           model: 'gpt-4',
//           messages: [
//             {
//               role: 'user',
//               content:
//                 'generate the ten highly It expert outlines on "The Ultimate AZ-900 Exam Prep: 10 Resources You Can\'t Afford to Miss" that is 15 year old understandable',
//             },
//             {
//               role: 'assistant',
//               content: 'my name is usman'
//             },
//             {
//               role: 'user',
//               content:
//                 'generate the article content on 1st outline that is act like the it expert and 100% seo base content and easily readable to 15 year old',
//             },
//             {
//               role: 'assistant',
//               content: 'my name is usman'
//             },
//           ],
//           temperature: 1,
//           max_tokens: 7133,
//           top_p: 1,
//           frequency_penalty: 0,
//           presence_penalty: 0,
//         });

//         // Access the content of the assistant's reply directly
//           const assistantReply = response.choices[1]?.message?.content || '';
//           console.log(assistantReply)
//         setArticleContent(assistantReply);
//       } catch (error) {
//         console.error('Error fetching data from OpenAI:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Generated Article Content:</h1>
//       <p>{articleContent}</p>
//     </div>
//   );
// };

// export default ChatGpt4;

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
      const openaiEndpoint = "https://api.openai.com/v1/chat/completions"; // Change the endpoint to chat/completions

      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4", // Use gpt-4 instead of gpt-3.5-turbo-instruct
          messages: [
            {
              role: "user",
              content:
                `write the 10 titles on "${prompt}" the title are fully seo based`,
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

  // const fetchOpenAIResponse = async () => {
  //   try {
  //     if (!prompt.trim()) {
  //       return;
  //     }

  //     const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  //     const openaiEndpoint = "https://api.openai.com/v1/completions";

  //     const { data } = await axios.post(
  //       openaiEndpoint,
  //       {
  //         model: "gpt-4",
  //         // prompt: `generate the most top 10 title and the all titles have must li tag for : "${prompt}" for exam blog post`,
  //         messages: [
  //           {
  //             role: "user",
  //             content:
  //               'write the outline on "AZ-900 Microsoft Azure Fundamentals Complete Exam Guide:"',
  //           },
  //           {
  //             role: "assistant",
  //             content:
  //               "I. Introduction \n   A. Explanation of AZ-900 Microsoft Azure Fundamentals\n   B. Importance of acquiring this Microsoft certification\n\nII. Understanding Microsoft Azure \n   A. Understanding cloud concepts \n   B. Overview of Azure services \n   C. Managing Azure subscriptions \n\nIII. Azure Architecture\n   A. Comprehension of Azure architecture concepts\n   B. Learning about Azure resources and resource groups\n   C. Overview of Azure cloud computing model\n\nIV. Core Azure Services \n   A. Description of core Azure services\n   B. Azure compute products \n   C. Network products in Azure\n   D. Storage products in Azure\n   E. AI & Machine Learning products in Azure\n   F. IoT services in Azure \n\nV. Azure Security & Compliance \n   A. Understanding Azure security \n   B. Knowledge of Azure compliance \n   C. An overview of Azure identity services \n\nVI. Azure Pricing and Support \n   A. Understanding Azure Service Level Agreements (SLAs)\n   B. Pricing and purchasing options in Azure \n   C. Factors affecting costs in Azure\n   D. Azure support plans \n\nVII. Exam Preparation \n   A. Detailed overview of the AZ-900 exam \n   B. Study tips for passing the AZ-900 exam \n   C. Practice questions \n   D. Resources for exam preparation \n   \nVIII. Conclusion \n   A. Recap of the AZ-900 certification exam guide\n   B. Encouragement for the exam preparation journey\n   C. Final tips for exam day.",
  //           },
  //           {
  //             role: "user",
  //             content: "on that 1st outline give me the content of 100 words\n",
  //           },
  //           {
  //             role: "assistant",
  //             content:
  //               "The AZ-900 Microsoft Azure Fundamentals exam is highly beneficial for individuals pursuing a career in cloud services, demonstrating their foundational knowledge on Azure services. It is the first step towards more complex Azure certifications. This guide aims to provide a comprehensive understanding of the core concepts, from explaining what cloud computing is, to the management of Azure subscriptions and an overview of Azure architecture. Acquiring this certification not only offers a competitive edge in the job market but plays a pivotal role in gaining hands-on experience in Microsoft Azure, paving the road for further learning and certifications towards a lucrative career in the cloud industry.",
  //           },
  //           {
  //             role: "user",
  //             content:
  //               "on 2nd outline give me the content of 150 words and it cannot match the 1st outline content",
  //           },
  //           {
  //             role: "assistant",
  //             content:
  //               "Microsoft's Azure platform is gaining traction as a preferred choice for companies adopting cloud services, making understanding its workings essential. Consequently, there is a pressing need to comprehend cloud concepts, especially regarding Microsoft Azure. This portion emphasizes the concept of cloud computing, outlining its models such as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Furthermore, the guide delves into various Azure services, delineating their functions and potential applications. This includes compute, analytics, storage, and networking services, among others. The chapter also explains how to manage Azure subscriptions effectively, including governance strategies, cost management, and subscription design. The import of understanding the Azure Architecture is not ignored - it explicates the relationship between Azure resources and resource groups. By gaining this knowledge, candidates can begin to design and manage effective, scalable Azure solutions to real-world problems.",
  //           },
  //           {
  //             role: "user",
  //             content:
  //               "on 3rd outline give me the content of 150 words and it cannot match the 1st outline content",
  //           },
  //           {
  //             role: "assistant",
  //             content:
  //               "The Azure Architecture module will guide you through the essential building blocks of Microsoft Azure. It starts by discussing Azure architecture concepts like Azure Compute, Azure Storage, Networking, and databases, all integral parts of creating and managing solutions on Azure. You'll learn the specifics of Azure resources, a manageable item available through Azure. Subsequently, you'll understand how to use Azure Resource Manager (ARM), a management layer for all resources in Azure. The concept of resource groups, logically grouping related resources together, is explained, making managing and organizing resources easier. It focuses on the cloud computing model, shedding light on the Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) components. Understanding the basics of architecture lays the groundwork for more advanced Azure skills and capabilities, providing a solid foundation for solving more complex tasks in your journey through Azure.",
  //           },
  //           {
  //             role: "user",
  //             content:
  //               "on 4rth outline give me the content of 150 words and it cannot match the upper conservation content",
  //           },
  //           {
  //             role: "assistant",
  //             content:
  //               "The segment on Core Azure Services is a deep dive into the main features provided by the Azure platform. It presents an extensive discussion of Azure compute solutions such as Virtual Machines (VMs), Azure Functions, and Azure Container instances, explaining their usage scenarios and benefits. It then proceeds to unpack the concept of networking, covering aspects like Azure Virtual Networks (VNet), load balancing, and VPN gateways, helping you understand how components can connect securely. Next, you'll find comprehensive coverage of Azure's storage options, including Blob storage, Queue Storage, and Azure File Share, detailing their utilization in a range of applications. In addition, the guide introduces you to Azure's AI and machine learning capabilities such as Azure Machine Learning Studio and Azure Cognitive Services that can bring intelligence to applications. Lastly, a section is dedicated to the IoT services offered by Azure, highlighting how to deal with IoT data and devices.",
  //           },
  //         ],
  //         temperature: 0,
  //         max_tokens: 7193,
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

  //     setResponse(data.choices[0].message.content);
  //     setOriginalPrompt(prompt);
      
  //   } catch (error) {
  //     console.error("Error fetching OpenAI response:", error);
  //   }
  // };

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

    const responses: string[] = [];

    for (const prompt of prompts) {
      const { data } = await axios.post(
        openaiEndpoint,
        {
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
          max_tokens: 7000,
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

      responses.push(data.choices[0].text);
    }

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




