import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCuD8l0Yxc7BbBwIosH2tNKhH0W1dEFY-g",
  authDomain: "prevent-crime-app.firebaseapp.com",
  projectId: "prevent-crime-app",
  storageBucket: "prevent-crime-app.appspot.com",
  messagingSenderId: "186924942933",
  appId: "1:186924942933:web:e3c08ea42f0c7030a036dc",
  measurementId: "G-Q5HPKJEB9P"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectFirestore = firebase.firestore()

// export firestore
export { projectFirestore }