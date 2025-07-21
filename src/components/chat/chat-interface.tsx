
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Menu, X, Paperclip, Mic } from "lucide-react"
import MessageBubble from "./message-bubble"
import ChatSidebar from "./chat-sidebar"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: string
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI travel assistant. I can help you plan trips, find destinations, book accommodations, and answer any travel-related questions. How can I assist you today?",
      isUser: false,
      timestamp: "Just now",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentChatId, setCurrentChatId] = useState("1")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'd be happy to help you with that! Based on your message about "${inputMessage}", I can provide detailed travel recommendations, help you plan your itinerary, suggest accommodations, and give you tips for your trip. What specific aspects of travel planning would you like me to focus on?`,
        isUser: false,
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI travel assistant. How can I help you plan your next adventure?",
        isUser: false,
        timestamp: "Just now",
      },
    ])
    setCurrentChatId(Date.now().toString())
  }

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId)
    // In a real app, you would load the chat history here
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EBE8DF]/30 via-white to-[#E9E9DF]/20">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-[#E3E1DD] px-6 py-4 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EBE8DF]/10 to-[#E9E9DF]/10"></div>
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#EBE8DF]/30 rounded-xl transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5 text-[#283F45]" /> : <Menu className="w-5 h-5 text-[#283F45]" />}
            </button>
            <div>
              <h1 className="text-lg font-semibold text-[#24424D]">AI Travel Assistant</h1>
              <p className="text-sm text-[#283F45]/70">Your personal travel planning companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <div className="w-2 h-2 bg-[#F0B46B] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#283F45]/70">Online</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 relative">
          {/* Background decorative elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-20 w-32 h-32 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-10"></div>
            <div className="absolute bottom-1/3 left-16 w-24 h-24 bg-gradient-to-tr from-[#F0B46B]/10 to-[#E87851]/10 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && <MessageBubble message="" isUser={false} timestamp="Now" isTyping={true} />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-[#E3E1DD] px-6 py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EBE8DF]/5 to-[#E9E9DF]/5"></div>
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <div className="relative bg-[#EBE8DF]/20 rounded-2xl border border-[#E3E1DD] overflow-hidden">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about travel planning..."
                    className="w-full px-4 py-3 pr-12 bg-transparent text-[#24424D] placeholder-[#283F45]/50 focus:outline-none resize-none max-h-32 min-h-[48px]"
                    rows={1}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <button className="p-2 hover:bg-[#E3E1DD]/50 rounded-lg transition-colors">
                      <Paperclip className="w-4 h-4 text-[#283F45]/50" />
                    </button>
                    <button className="p-2 hover:bg-[#E3E1DD]/50 rounded-lg transition-colors">
                      <Mic className="w-4 h-4 text-[#283F45]/50" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-[#266267] to-[#24424D] text-white rounded-2xl hover:from-[#266267]/90 hover:to-[#24424D]/90 focus:outline-none focus:ring-4 focus:ring-[#266267]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#283F45]/50">
              <span>Press Enter to send, Shift + Enter for new line</span>
              <span>{inputMessage.length}/2000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface