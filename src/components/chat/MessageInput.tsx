import { useState, type KeyboardEvent } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

interface MessageInputProps {
  onSend: (text: string) => Promise<void>
  disabled?: boolean
}

const MessageInput = ({ onSend, disabled = false }: MessageInputProps) => {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!text.trim() || sending) return

    setSending(true)
    try {
      await onSend(text)
      setText('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const remainingChars = 500 - text.length

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={disabled || sending}
          maxLength={500}
          rows={1}
          className="flex-1 resize-none px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-sm md:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled || sending}
          className="px-3 md:px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white dark:text-gray-900 rounded-full transition-colors disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
          aria-label="Send message"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </div>
      
      {/* Character count */}
      <div className="mt-1 text-right">
        <span className={`text-xs ${remainingChars < 50 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {remainingChars} characters remaining
        </span>
      </div>
    </div>
  )
}

export default MessageInput
