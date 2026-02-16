export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  provider: string
}

export interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  senderAvatar: string
  type: 'public' | 'private'
  recipientId: string | null
  timestamp: any
  createdAt: Date
}

export type ChatMode = 'public' | 'private'

export interface TypingIndicator {
  userId: string
  userName: string
  isTyping: boolean
}
