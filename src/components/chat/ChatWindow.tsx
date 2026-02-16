import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import type { ChatMode, Message as MessageType } from '../../types/chat'
import {
  sendMessage,
  subscribeToPublicMessages,
  subscribeToPrivateMessages,
  deleteMessage
} from '../../services/chatService'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const { user } = useAuth()
  const [mode, setMode] = useState<ChatMode>('public')
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo('.chat-window',
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [isOpen])

  // Subscribe to messages based on mode
  useEffect(() => {
    if (!user) return

    setLoading(true)
    setError(null)

    let unsubscribe: (() => void) | undefined

    try {
      if (mode === 'public') {
        unsubscribe = subscribeToPublicMessages((msgs) => {
          setMessages(msgs)
          setLoading(false)
        })
      } else {
        unsubscribe = subscribeToPrivateMessages(user.uid, (msgs) => {
          setMessages(msgs)
          setLoading(false)
        })
      }
    } catch (err) {
      setError('Failed to load messages')
      setLoading(false)
    }

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [user, mode])

  const handleSendMessage = async (text: string) => {
    if (!user) return

    try {
      await sendMessage(
        text,
        user.uid,
        user.displayName || 'Anonymous',
        user.photoURL || '/default-avatar.png',
        mode,
        mode === 'private' ? 'OWNER_ID' : undefined // TODO: Get actual owner ID
      )
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
      throw err
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!user) return

    try {
      await deleteMessage(messageId, user.uid, user.email)
    } catch (err) {
      setError('Failed to delete message')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:items-end md:justify-end md:p-6 flex items-center justify-center md:pointer-events-none bg-black/50 md:bg-transparent">
      <div className="chat-window pointer-events-auto w-full h-full md:w-[400px] md:h-[600px] md:max-h-[80vh] bg-white dark:bg-gray-900 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 md:border md:border-gray-200 md:dark:border-gray-800 pb-16 md:pb-0">
        {/* Header */}
        <div className="bg-gray-900 dark:bg-white p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white dark:text-gray-900 font-bold text-lg">Chat</h3>
            <p className="text-gray-300 dark:text-gray-600 text-xs">
              {mode === 'public' ? 'Public Discussion' : 'Private Message'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-gray-900/10 rounded-full p-2 transition-colors"
            aria-label="Close chat"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => setMode('public')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === 'public'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white bg-white dark:bg-gray-900'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Public Chat
          </button>
          <button
            onClick={() => setMode('private')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mode === 'private'
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white bg-white dark:bg-gray-900'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Private Chat
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Messages */}
        <MessageList
          messages={messages}
          loading={loading}
          onDeleteMessage={handleDeleteMessage}
        />

        {/* Input */}
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
