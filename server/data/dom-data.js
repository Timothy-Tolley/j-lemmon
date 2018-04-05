const jsdom = require('jsdom')
const {JSDOM} = jsdom
// const request = require('superagent')

var url = 'https://www.instagram.com/p/Bge6CgOAih3/'

// function getPageDom () {
//   return request
//     .get('https://www.instagram.com/p/Bge6CgOAih3/')
//     .then(res => res.body.window)
//     .then(body => {
//       console.log(body)
//     })
// }

JSDOM.fromURL(url)
  .then(dom => {
    const domData = dom.serialize()
    // eslint-disable-next-line no-console
    console.log(domData)
    const link = domData.Slice('video_url', '.mp4')
    // eslint-disable-next-line no-console
    console.log(link)
  })

// // getPageDom()

// function domData () {
//   return request
//     .get(url)
//     .then((res) => {
//       let $ = cheerio.load(res)
//       console.log(res.text)
//       $()
//     })
// }

// domData()
