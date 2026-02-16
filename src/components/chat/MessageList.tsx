import { useEffect, useRef } from 'react'
import type { Message as MessageType } from '../../types/chat'
import Message from './Message'

interface MessageListProps {
  messages: MessageType[]
  loading: boolean
  onDeleteMessage: (messageId: string) => void
}

const MessageList = ({ messages, loading, onDeleteMessage }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-2">No messages yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Be the first to say hello! 👋</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onDelete={onDeleteMessage}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
