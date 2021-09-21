const express = require('express')
const app = express()
const routes = require('./routes')
const port = 9098

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
