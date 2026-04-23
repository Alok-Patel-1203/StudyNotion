import React, { useState, useRef, useEffect } from "react";
import { apiConnector } from "../../../services/apiconnector";
import { chatEndpoints } from "../../../services/apis";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";

const VideoChatbot = ({ videoTitle, videoDescription, transcript }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! I am your AI tutor. Ask me any questions about the current lecture!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await apiConnector("POST", chatEndpoints.VIDEO_CHAT_API, {
        message: userMessage,
        videoTitle: videoTitle || "Lecture Video",
        videoDescription: videoDescription || "",
        transcript: transcript || "",
        history: messages.slice(1), // Exclude initial welcome message from history sent back
      });

      if (response?.data?.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.data.data }
        ]);
      } else {
        throw new Error(response.data.message || "Failed to fetch response");
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      
      let errorMessage = "Sorry, I am facing an issue connecting to the servers.";
      if (error.message) errorMessage = error.message;
      if (error?.response?.data?.message) errorMessage = error.response.data.message;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${errorMessage}. Please make sure you have restarted your terminal so changes to the .env file are applied!` }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[1000] flex h-14 w-14 items-center justify-center rounded-full bg-yellow-50 text-richblack-900 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-yellow-50/50"
        >
          <FiMessageSquare className="text-3xl" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[1000] flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-[0_0_40px_rgba(0,0,0,0.4)] transition-all duration-300 sm:w-[400px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-richblack-700 bg-richblack-900 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50 text-richblack-900">
                <FiMessageSquare className="text-lg" />
              </div>
              <h2 className="text-lg font-semibold text-richblack-5">AI Tutor</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-richblack-200 transition-colors hover:text-white"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-richblack-800">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${msg.role === "user"
                      ? "rounded-br-sm bg-yellow-50 text-richblack-900"
                      : "rounded-bl-sm bg-richblack-700 text-richblack-5"
                    }`}
                >
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed break-words">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-richblack-700 px-4 py-3">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-richblack-200"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-richblack-200" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-richblack-200" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-3 border-t border-richblack-700 bg-richblack-900 p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1 rounded-full border border-richblack-600 bg-richblack-800 px-4 py-2.5 text-[15px] text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-yellow-50 text-richblack-900 transition-all hover:bg-yellow-100 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="text-lg -ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default VideoChatbot;
