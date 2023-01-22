var cron = require('node-cron')
const { doc, setDoc } = require('firebase/firestore')
const { emailRef, TimeZoneRef, getTimeZones } = require('./firebase')

const handleEmail = async ({ email, timeZone }) => {
  await setDoc(doc(emailRef), {
    Email: email,
    TimeZone: timeZone,
  })
}
const handleTimeZone = async ({ timeZone }) => {
  await setDoc(doc(TimeZoneRef), {
    TimeZone: timeZone,
  })
}

const handleSchedule = async () => {
  const allTimeZones = await getTimeZones()

  const saved = '0 7 */1 */1 *'
  const ScheduleExe = (TimeZone) => {
    const task = cron.schedule(
      '*/5 * * * * *',
      () => {
        console.log('Hello', TimeZone)
      },
      {
        scheduled: true,
        timezone: TimeZone,
      }
    )
    task.start()
    return task
  }
  allTimeZones.forEach((storedTimeZone) => {
    const task = ScheduleExe(storedTimeZone.TimeZone)
    const timer = cron.schedule('*/5 * * * * *', () => {
      task.stop()
    })
  })
}

module.exports = {
  handleEmail,
  handleTimeZone,
  handleSchedule,
}
