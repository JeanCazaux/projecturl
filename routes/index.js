const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/login", (req, res) => {
  const username = req.body.username
  const user = {
    username
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken })
})

router.post('/api/shorturl/', authenticateToken, async (req, res) => {
  try {
    const url = req.body.url
    const urlTool = require(`${process.cwd()}/src/urlTool`)
    if (urlTool.check(url)) {
      let urlObj = require(`${process.cwd()}/models/url`).url(url)
      if (!urlObj) {
        urlObj = require(`${process.cwd()}/models/url`).add(url)
      }
      res.status(200).json({
        originalUrl : urlObj.originalUrl,
        shortUrl: urlObj.shortUrl
      })
    } else {
      res.status(400).json({
        error: 'invalid URL'
      })
    }
  } catch (err) {
    res.status(400).json({
      err: err
    })
  }
})

router.get('/api/shorturl/analytics/', async (req, res) => {
  try {
    const urls = require(`${process.cwd()}/models/url`).urls()
    res.status(200).json(urls.map(a => ({
      originalUrl: a.originalUrl,
      shortUrl: a.shortUrl,
      nbClicks: a.nbClicks
    })))
  } catch (err) {
    res.status(400).json({
      err: err
    })
  }
})

router.get('/api/shorturl/:shortUrl', async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    if(!shortUrl || shortUrl.trim() === '') {
      throw 'error!'
    }
    let urlObj = require(`${process.cwd()}/models/url`).urlGetByShortUrl(shortUrl)
    if(!urlObj) {
      throw 'error!'
    }
    urlObj.nbClicks = urlObj.nbClicks + 1
    require(`${process.cwd()}/models/url`).update(urlObj)
    res.redirect(`//${urlObj.originalUrl}`)
  } catch (err) {
    res.send("404")
  }
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

module.exports = router