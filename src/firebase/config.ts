import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey:  "AIzaSyCPoUhZUdnjX4EezTrApq_DviJIxbSRgSY",
  authDomain: "zieetech.firebaseapp.com",
  databaseURL: "https://zieetech-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zieetech",
  storageBucket: "zieetech.firebasestorage.app",
  messagingSenderId:  "984944372288",
  appId: "1:984944372288:web:cc3187784b602b87f44da5",
  measurementId:  "G-54W75JHXDJ"
}

const app = initializeApp(firebaseConfig)

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export const database = getDatabase(app)