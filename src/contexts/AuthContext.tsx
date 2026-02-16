import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { 
  type User as FirebaseUser,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import type { User } from '../types/chat'

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Convert Firebase User to our User type
  const convertUser = (firebaseUser: FirebaseUser, provider: string): User => {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      provider
    }
  }

  // Save user to Firestore
  const saveUserToFirestore = async (user: User) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.provider,
        lastActive: serverTimestamp()
      }, { merge: true })
    } catch (error) {
      console.error('Error saving user to Firestore:', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const convertedUser = convertUser(result.user, 'google')
      await saveUserToFirestore(convertedUser)
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const convertedUser = convertUser(result.user, 'github')
      await saveUserToFirestore(convertedUser)
    } catch (error) {
      console.error('Error signing in with GitHub:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Determine provider from providerData
        const provider = firebaseUser.providerData[0]?.providerId.includes('google') 
          ? 'google' 
          : 'github'
        const convertedUser = convertUser(firebaseUser, provider)
        setUser(convertedUser)
        await saveUserToFirestore(convertedUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
