import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend, FiLoader } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I am your AI assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");

    // 1. Add user message to state
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
    setLoading(true);

    try {
      // Connect to your Express backend
      const response = await fetch("http://localhost:4000/api/v1/chat/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(1) // Avoid sending the initial system tutorial message back
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { text: data.data, sender: "bot" }]);
      } else {
        throw new Error(data.message || "Server rejected request");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { text: `API Error: ${error.message} (Is your server running and API Key valid?)`, sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter">
      {/* Chat Window Modal */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 w-[380px] h-[550px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl bg-richblack-900/95 backdrop-blur-xl border border-richblack-700/50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out transform origin-bottom-right">

          <div className="w-full h-full flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 animate-none">
            {/* Header */}
            <div className="bg-gradient-to-r from-richblack-800 to-richblack-900 border-b border-richblack-700 px-5 py-4 flex justify-between items-center z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-tr from-yellow-200 to-yellow-50 p-2 rounded-full shadow-[0_0_15px_rgba(255,214,10,0.4)]">
                  <FiMessageCircle className="text-richblack-900 text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-richblack-5 text-[16px] tracking-wide">AI Assistant</h3>
                  <p className="text-xs text-caribbeangreen-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-caribbeangreen-400"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-richblack-300 hover:text-white hover:bg-richblack-700 p-2 rounded-full transition-all duration-200"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-none`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 text-[14.5px] leading-relaxed shadow-md ${msg.sender === "user"
                      ? "bg-gradient-to-br from-yellow-200 to-yellow-50 text-richblack-900 rounded-br-sm"
                      : "bg-richblack-800/80 backdrop-blur-sm text-richblack-5 border border-richblack-700/50 rounded-bl-sm overflow-hidden"
                      }`}
                  >
                    {msg.sender === "user" ? (
                      msg.text
                    ) : (
                      <ReactMarkdown
                        className="markdown-body text-sm font-inter space-y-2 prose-invert max-w-none"
                        components={{
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-2" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                          code: ({ node, inline, ...props }) =>
                            inline
                              ? <code className="bg-richblack-900 px-1.5 py-0.5 rounded text-yellow-50 text-[13px]" {...props} />
                              : <div className="bg-richblack-900 p-3 rounded-md my-2 overflow-x-auto"><code className="text-[13px] text-richblack-50" {...props} /></div>,
                          h3: ({ node, ...props }) => <h3 className="font-bold text-lg mt-3 mb-1 text-yellow-50" {...props} />,
                          h4: ({ node, ...props }) => <h4 className="font-semibold text-md mt-2 mb-1" {...props} />,
                          a: ({ node, ...props }) => <a className="text-caribbeangreen-200 hover:underline" {...props} />
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-richblack-800/80 backdrop-blur-sm text-richblack-100 border border-richblack-700/50 rounded-2xl rounded-bl-sm px-5 py-3 text-sm shadow-md flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-yellow-50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 bg-richblack-900 border-t border-richblack-700/50 flex gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.3)] z-10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-richblack-800 text-richblack-5 rounded-full px-5 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-50 border border-richblack-700 placeholder-richblack-400 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-yellow-100 to-yellow-50 text-richblack-900 w-12 h-12 rounded-full flex items-center justify-center hover:shadow-[0_0_15px_rgba(255,214,10,0.5)] transition-all duration-300 disabled:opacity-50 disabled:hover:shadow-none hover:scale-105 active:scale-95"
              >
                <FiSend className="text-xl ml-1" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "bg-richblack-800 text-yellow-50 border border-yellow-50/20" : "bg-gradient-to-r from-yellow-100 to-yellow-50 text-richblack-900 shadow-[0_0_20px_rgba(255,214,10,0.4)]"} 
          w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 ease-out z-50`}
      >
        {isOpen ? <FiX className="text-2xl" /> : <FiMessageCircle className="text-3xl" />}
      </button>
    </div>
  );
};

export default Chatbot;
