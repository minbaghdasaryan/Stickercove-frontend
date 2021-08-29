import firebase from "firebase/app"
import "firebase/storage"
import "firebase/analytics"

const config = {
  apiKey: "AIzaSyC0UHzQv-Ce7p4XteBYfS54sZzN94LerJU",
  authDomain: "sticker-cove.firebaseapp.com",
  databaseURL: "https://sticker-cove-default-rtdb.firebaseio.com",
  projectId: "sticker-cove",
  storageBucket: "sticker-cove.appspot.com",
  messagingSenderId: "307291309080",
  appId: "1:307291309080:web:e846c6dbef27b744e52f6d",
  measurementId: "G-FVFN88KCQ9",
}

firebase.initializeApp(config)
firebase.analytics()

export const storage = firebase.storage()
export default config
