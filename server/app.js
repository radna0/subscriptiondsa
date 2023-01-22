const express = require('express')
const cors = require('cors')
const { getEmails, getTimeZones } = require('./firebase')
const { handleEmail, handleTimeZone, handleSchedule } = require('./utility')
const { LeetCode } = require('leetcode-query')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get(`${process.env.EXPRESS_GET_ENDPOINT_ENV}`, async (req, res) => {
  const leetcode = new LeetCode()

  
  const problems = await leetcode.problems({
    limit: 10,
    filters: {
      difficulty: 'EASY',
    },
  })
  handleSchedule()
  res.json(problems)
})

app.post(`${process.env.EXPRESS_POST_ENDPOINT_ENV}`, async (req, res) => {
  try {
    const { email, timeZone } = req.body

    const allEmails = await getEmails()
    const found = allEmails.find((storedEmail) => storedEmail.Email == email)
    if (found) throw new Error('Duplicate Entry')

    await handleEmail({ email, timeZone })

    const allTimeZones = await getTimeZones()
    const foundTimeZone = allTimeZones.find(
      (storedTimeZone) => storedTimeZone.TimeZone == timeZone
    )
    if (!foundTimeZone) await handleTimeZone({ timeZone })

    res.status(200).json('Success')
  } catch (e) {
    res.status(409).send(e)
  }
})
module.exports = app
