import type React from "react"
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react"

interface MessageBubbleProps {
  message: string
  isUser: boolean
  timestamp: string
  isTyping?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser, timestamp, isTyping = false }) => {
  return (
    <div className={`flex gap-4 mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className={`max-w-[80%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 relative overflow-hidden ${
            isUser
              ? "bg-gradient-to-br from-[#266267] to-[#24424D] text-white ml-auto"
              : "bg-white border border-[#E3E1DD] text-[#24424D]"
          }`}
        >
          {!isUser && (
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#EBE8DF]/20 to-[#E9E9DF]/20 rounded-full -translate-y-4 translate-x-4"></div>
          )}

          <div className="relative">
            {isTyping ? (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#266267] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#266267] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#266267] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-[#283F45]/70 text-sm ml-2">AI is thinking...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
            )}
          </div>
        </div>

        <div
          className={`flex items-center gap-2 mt-2 text-xs text-[#283F45]/50 ${isUser ? "justify-end" : "justify-start"}`}
        >
          <span>{timestamp}</span>
          {!isUser && !isTyping && (
            <div className="flex items-center gap-1 ml-2">
              <button className="p-1 hover:bg-[#EBE8DF]/50 rounded transition-colors">
                <Copy className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-[#EBE8DF]/50 rounded transition-colors">
                <ThumbsUp className="w-3 h-3" />
              </button>
              <button className="p-1 hover:bg-[#EBE8DF]/50 rounded transition-colors">
                <ThumbsDown className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-[#F0B46B] to-[#E87851] rounded-full flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageBubble