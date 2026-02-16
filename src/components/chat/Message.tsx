import { formatDistanceToNow } from 'date-fns'
import { FaTrash } from 'react-icons/fa'
import type { Message as MessageType } from '../../types/chat'
import { useAuth } from '../../contexts/AuthContext'
import { isOwner } from '../../services/chatService'

interface MessageProps {
  message: MessageType
  onDelete: (messageId: string) => void
}

const Message = ({ message, onDelete }: MessageProps) => {
  const { user } = useAuth()
  const isOwnMessage = user?.uid === message.senderId
  const canDelete = isOwnMessage || isOwner(user?.email || null)

  const formatTimestamp = (date: Date) => {
    try {
      return formatDistanceToNow(date, { addSuffix: true })
    } catch {
      return 'just now'
    }
  }

  return (
    <div className={`flex gap-2 md:gap-3 mb-3 md:mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <img
        src={message.senderAvatar || '/default-avatar.png'}
        alt={message.senderName}
        className="w-8 h-8 md:w-9 md:h-9 rounded-full flex-shrink-0 object-cover"
      />

      {/* Message content */}
      <div className={`flex-1 max-w-[75%] md:max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {isOwnMessage ? 'You' : message.senderName}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimestamp(message.createdAt)}
          </span>
        </div>

        <div className={`relative group ${isOwnMessage ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'} rounded-2xl px-3 py-2 md:px-4 md:py-2.5`}>
          <p className="text-sm break-words leading-relaxed">{message.text}</p>

          {/* Delete button */}
          {canDelete && (
            <button
              onClick={() => onDelete(message.id)}
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg"
              aria-label="Delete message"
            >
              <FaTrash className="text-xs" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
