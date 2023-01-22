const app = require('./app')
const { handleSchedule } = require('./utility')
require('dotenv').config()

app.listen(process.env.EXPRESS_PORT, async () => {
  console.log(
    `💵 Server running and listening on http://localhost:${process.env.EXPRESS_PORT}/ …`
  )
  fetch(
    'https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json'
  )
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      for (let time in json) {
        handleSchedule(time)
      }
    })
})
