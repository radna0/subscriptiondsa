const express = require('express')
const cors = require('cors')
const { getEmails } = require('./firebase')
const { handleEmail, handleGivingProblems } = require('./utility')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
// async function getDataTZ() {
//   let response = await fetch(`${process.env.EXPRESS_ALL_TIMEZONES}`)
//   let data = await response.json()
//   return data
// }
// app.get('/', async (req, res) => {
//   const problems = await handleGivingProblems()
//   res.json(problems)
// })
app.post(`${process.env.EXPRESS_POST_ENDPOINT_ENV}`, async (req, res) => {
  try {
    const { email, timeZone } = req.body

    const allEmails = await getEmails()
    const found = allEmails.find((storedEmail) => storedEmail.Email == email)
    if (found) throw new Error('Duplicate Entry')
    const problems = await handleGivingProblems()
    await handleEmail({ email, timeZone, problems })

    res.status(200).json('Success')
  } catch (e) {
    res.status(409).send(e)
  }
})
module.exports = app
