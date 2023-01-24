import { useEffect } from "react";
import { useRef, useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const messagesEndRef = useRef(null);
  const [conversations, setConversations] = useState([
    {
      user: "gpt",
      answer:
        "You can also use variant modifiers to target media queries like responsive breakpoints",
    },
    {
      user: "user",
      answer:
        "You can also use variant modifiers to target media queries like responsive breakpoints",
    },
  ]);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [conversations.length]);
  const handleSubmit = () => {
    const data = { message: question };
    setConversations((prev) => [...prev, { user: "user", answer: question }]);

    fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setConversations((prev) => [
          ...prev,
          { user: "gpt", answer: data.message },
        ]);

        setQuestion("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#B8CDF6] via-[#B9B0DD] to-[#BEB8CB] h-screen w-screen">
      <div className="rounded-lg w-4/5 mx-auto shadow-md bg-[#CED1EE] h-4/5 p-5 flex flex-col">
        <h2 className="font-semibold text-center tracking-wider">
          The3rdBrother
        </h2>
        <div className="flex-1 my-2 overflow-scroll">
          {conversations.map((conversation, index) => (
            <div
              className={`flex ${
                conversation.user === "user" && "justify-end"
              }`}
              key={index}
            >
              <div
                className={`rounded-t-lg p-2 ${
                  conversation.user === "gpt"
                    ? "rounded-br-lg bg-[#DCE3FB]"
                    : "rounded-bl-lg bg-[#F4FDFF]"
                } shadow-md my-2`}
              >
                <p className="text-xs font-medium whitespace-pre-line">
                  {conversation.answer}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center w-4/5 bg-white rounded-2xl mx-auto px-2 py-1">
          <textarea
            type="text"
            placeholder="Type here..."
            className="flex-1 outline-none px-1"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={handleSubmit}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
