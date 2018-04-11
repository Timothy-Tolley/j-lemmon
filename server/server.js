const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const videoLinks = require('./routes/videoLinks.js').router

const server = express()

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1/', videoLinks)

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
