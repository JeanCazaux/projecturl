require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
