const express = require('express')
const cors = require('cors')
const { getEmails } = require('./firebase')
const { handleEmail } = require('./utility')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.post(`${process.env.EXPRESS_POST_ENDPOINT_ENV}`, async (req, res) => {
  try {
    const { email, timeZone } = req.body

    const allEmails = await getEmails()
    const found = allEmails.find((storedEmail) => storedEmail.Email == email)
    if (found) throw new Error('Duplicate Entry')
    await handleEmail({ email, timeZone })

    res.status(200).json('Success')
  } catch (e) {
    res.status(409).send(e)
  }
})
module.exports = app
