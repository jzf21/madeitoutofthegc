import ChatInterface from "../components/chat/chat-interface"
import Layout from "../layouts/Layout"



export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <Layout>
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </Layout>
    </div>
  )
}
