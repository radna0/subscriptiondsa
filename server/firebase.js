const { initializeApp } = require('firebase/app')
const {
  getFirestore,
  collection,
  query,
  getDocs,
} = require('firebase/firestore')
const config = {
  apiKey: 'AIzaSyDiOuVXm_8TWb_IjYoqFdFy76LOWHNHXww',
  authDomain: 'subscriptiondsa.firebaseapp.com',
  projectId: 'subscriptiondsa',
  storageBucket: 'subscriptiondsa.appspot.com',
  messagingSenderId: '540951610498',
  appId: '1:540951610498:web:e330e252a8028f2ff8209b',
  measurementId: 'G-PSL2XYS6H4',
}

const appfB = initializeApp(config)
const db = getFirestore(appfB)
const emailRef = collection(db, 'emails')

async function getEmails() {
  const docSnap = await getDocs(emailRef)
  const emails = []
  docSnap.forEach((doc) => {
    emails.push({ ...doc.data() })
  })
  return emails
}

module.exports = {
  appfB,
  emailRef,
  getEmails,
  db,
}
