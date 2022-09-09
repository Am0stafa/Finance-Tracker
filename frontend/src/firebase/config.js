import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAn_CPdVlTDNwyOff2VN2f04HS-xLxBI5U",
  authDomain: "finance-tracker-9f454.firebaseapp.com",
  projectId: "finance-tracker-9f454",
  storageBucket: "finance-tracker-9f454.appspot.com",
  messagingSenderId: "684208187283",
  appId: "1:684208187283:web:cd580540d3c967fb272a66"
};


console.log("init firebase run")

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const db = firebase.firestore()
const auth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { db, auth, timestamp }