const urls = [
  {
    id: 'e25543cb-3da2-4298-9eb7-f89a75698505',
    originalUrl: 'www.lunii.com',
    shortUrl: '4hxNeK',
    nbClicks: 3
  }
]

exports.urls = () => {
  return urls
}

exports.url = (url) => {
  return this.urls().find(a => a.originalUrl === url)
}

exports.urlGetByShortUrl = (shortUrl) => {
  return this.urls().find(a => a.shortUrl === shortUrl)
}

exports.add = (url) => {
  const { v4: uuidv4 } = require('uuid')
  const urlObj = {
    id: uuidv4(),
    originalUrl: url,
    shortUrl: uuidv4(),
    nbClicks: 0
  }
  urls.push(urlObj)
  return urlObj
}

exports.update = (urlObj) => {
  return this.urls().map(a => (a.originalUrl === urlObj.originalUrl ? { ...a, ...urlObj } : a))
}
