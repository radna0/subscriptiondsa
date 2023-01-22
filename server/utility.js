var cron = require('node-cron')
const { doc, setDoc } = require('firebase/firestore')
const { emailRef } = require('./firebase')
const { LeetCode } = require('leetcode-query')

const handleEmail = async ({ email, timeZone }) => {
  await setDoc(doc(emailRef), {
    Email: email,
    TimeZone: timeZone,
  })
}

const handleSchedule = async (TimeZone) => {
  // const leetcode = new LeetCode()

  // const problems = await leetcode.problems({
  //   limit: 10,
  //   filters: {
  //     difficulty: 'EASY',
  //   },
  // })
  // const saved = '0 7 */1 */1 *'
  const ScheduleExe = () => {
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
  const task = ScheduleExe()
  cron.schedule('*/5 * * * * *', () => {
    task.stop()
  })
}

module.exports = {
  handleEmail,
  handleSchedule,
}
