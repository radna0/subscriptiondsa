const app = require('./app')
require('dotenv').config()

app.listen(process.env.EXPRESS_PORT, async () => {
  console.log(
    `💵 Server running and listening on http://localhost:${process.env.EXPRESS_PORT}/ …`
  )
})
