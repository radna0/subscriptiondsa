const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs, doc } = require('firebase/firestore')
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
const TimeZoneRef = collection(db, 'timezones')

async function getEmails() {
  const docSnap = await getDocs(emailRef)
  const emails = []
  docSnap.forEach((doc) => {
    emails.push({ ...doc.data() })
  })
  return emails
}
async function getTimeZones() {
  const docSnap = await getDocs(TimeZoneRef)
  const zones = []
  docSnap.forEach((doc) => {
    zones.push({ ...doc.data() })
  })
  return zones
}

module.exports = {
  appfB,
  emailRef,
  getEmails,
  TimeZoneRef,
  getTimeZones,
  db,
}
