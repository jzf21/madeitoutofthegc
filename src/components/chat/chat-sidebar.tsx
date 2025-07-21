

import type React from "react"
import { useState } from "react"
import { Plus, MessageSquare, Search, MoreHorizontal } from "lucide-react"

interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

interface ChatSidebarProps {
  isOpen: boolean
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  currentChatId?: string
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onNewChat, onSelectChat, currentChatId }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Trip to Japan Planning",
      lastMessage: "Can you help me plan a 10-day trip to Japan?",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Budget Travel Europe",
      lastMessage: "What's the best way to travel Europe on a budget?",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      title: "Beach Destinations",
      lastMessage: "Recommend some beautiful beach destinations",
      timestamp: "3 days ago",
    },
    {
      id: "4",
      title: "Mountain Hiking Spots",
      lastMessage: "Best hiking trails in the Rocky Mountains?",
      timestamp: "1 week ago",
    },
  ]

  const filteredChats = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!isOpen) return null

  return (
    <div className="w-80 bg-white border-r border-[#E3E1DD] flex flex-col h-full relative overflow-hidden">
      {/* Curved background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-4 w-24 h-24 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-4 w-32 h-32 bg-gradient-to-tr from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-[#E3E1DD] relative">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#266267] to-[#24424D] text-white py-3 px-4 rounded-2xl font-medium hover:from-[#266267]/90 hover:to-[#24424D]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div className="p-4 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#283F45]/50" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#E3E1DD] rounded-xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
          />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 relative">
        <div className="space-y-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#EBE8DF]/30 ${
                currentChatId === chat.id ? "bg-[#EBE8DF]/50 border border-[#266267]/20" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#F0B46B]/20 to-[#E87851]/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 text-[#F0B46B]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-[#24424D] truncate">{chat.title}</h3>
                  <p className="text-xs text-[#283F45]/70 truncate mt-1">{chat.lastMessage}</p>
                  <p className="text-xs text-[#283F45]/50 mt-1">{chat.timestamp}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:bg-[#E3E1DD] rounded transition-colors">
                    <MoreHorizontal className="w-3 h-3 text-[#283F45]/50" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#E3E1DD] relative">
        <div className="flex items-center justify-between text-xs text-[#283F45]/50">
          <span>AI Travel Assistant</span>
          <span>v1.0</span>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
