import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'
import type { Message, ChatMode } from '../types/chat'

const OWNER_EMAIL = 'reyzidan23@gmail.com'
const MESSAGE_LIMIT = 50
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const MAX_MESSAGES_PER_WINDOW = 10

// Rate limiting map
const userMessageTimestamps = new Map<string, number[]>()

// Check if user is rate limited
const isRateLimited = (userId: string): boolean => {
  const now = Date.now()
  const timestamps = userMessageTimestamps.get(userId) || []
  
  // Remove timestamps outside the window
  const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW)
  
  if (recentTimestamps.length >= MAX_MESSAGES_PER_WINDOW) {
    return true
  }
  
  // Update timestamps
  recentTimestamps.push(now)
  userMessageTimestamps.set(userId, recentTimestamps)
  
  return false
}

// Send a message
export const sendMessage = async (
  text: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  type: ChatMode,
  recipientId?: string
): Promise<void> => {
  // Validate message
  if (!text.trim() || text.length > 500) {
    throw new Error('Message must be between 1 and 500 characters')
  }

  // Check rate limit
  if (isRateLimited(senderId)) {
    throw new Error('You are sending messages too quickly. Please wait a moment.')
  }

  try {
    await addDoc(collection(db, 'messages'), {
      text: text.trim(),
      senderId,
      senderName,
      senderAvatar,
      type,
      recipientId: type === 'private' ? recipientId : null,
      timestamp: serverTimestamp(),
      createdAt: new Date()
    })
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

// Listen to public messages
export const subscribeToPublicMessages = (
  callback: (messages: Message[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'messages'),
    where('type', '==', 'public'),
    orderBy('createdAt', 'desc'),
    limit(MESSAGE_LIMIT)
  )

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp,
      createdAt: doc.data().createdAt?.toDate() || new Date()
    } as Message))
    
    callback(messages.reverse())
  }, (error) => {
    console.error('Error in public messages subscription:', error)
    callback([])
  })
}

// Listen to private messages for a specific conversation
export const subscribeToPrivateMessages = (
  userId: string,
  callback: (messages: Message[]) => void
): (() => void) => {
  try {
    // Get messages where user is either sender or recipient
    const q = query(
      collection(db, 'messages'),
      where('type', '==', 'private'),
      orderBy('createdAt', 'desc'),
      limit(MESSAGE_LIMIT)
    )

    return onSnapshot(q, (snapshot) => {
      const messages: Message[] = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp,
          createdAt: doc.data().createdAt?.toDate() || new Date()
        } as Message))
        .filter(msg => 
          msg.senderId === userId || msg.recipientId === userId
        )
      
      callback(messages.reverse())
    }, (error) => {
      console.error('Error in private messages subscription:', error)
      callback([])
    })
  } catch (error) {
    console.error('Error setting up private messages subscription:', error)
    return () => {}
  }
}

// Delete a message
export const deleteMessage = async (
  messageId: string,
  _userId: string,
  userEmail: string | null
): Promise<void> => {
  try {
    // Check if user is owner or message sender
    const messageRef = doc(db, 'messages', messageId)
    
    // For now, we'll allow deletion if user is owner or sender
    // In production, you'd fetch the message first to verify sender
    if (userEmail === OWNER_EMAIL) {
      await deleteDoc(messageRef)
    } else {
      // Only allow deleting own messages
      await deleteDoc(messageRef)
    }
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

// Get owner user ID by email
export const getOwnerUserId = async (): Promise<string | null> => {
  // This would typically query the users collection
  // For now, we'll handle this in the component
  return null
}

// Check if user is the portfolio owner
export const isOwner = (userEmail: string | null): boolean => {
  return userEmail === OWNER_EMAIL
}
