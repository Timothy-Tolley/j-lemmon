/* global test expect */

const videoFunctions = require('../../server/routes/videoLinks.js')

test('getVideoLinks returns an Array of Links', () => {
  const videoShortCodes = [
    'Bge6CgOAih3',
    'BfjfoGKFHsh',
    'Ba76Vyelmdf'
  ]
  const expected = [
    'https://instagram.fakl4-1.fna.fbcdn.net/vp/46471135a992b3065fd6d9703b7b03d4/5ACEC907/t50.2886-16/29014116_157494074932674_2719175251438075904_n.mp4',
    'https://instagram.fakl4-1.fna.fbcdn.net/vp/0eca32b8250891398e075277eb6d1f65/5ACF3E80/t50.2886-16/28386424_173300599956018_1054757742134165504_n.mp4',
    'https://instagram.fakl4-1.fna.fbcdn.net/vp/bcb3501775799bef56f51078922376c2/5ACEAEFA/t50.2886-16/23166533_1643020249051996_8642810780489613312_n.mp4'
  ]

  return videoFunctions.getVideoLinks(videoShortCodes)
    .then(actual =>
      expect(actual).toEqual(expected)
    )
})

test('getUrl returns a Link', () => {
  const shortcode = 'Bge6CgOAih3'

  const expected = 'https://instagram.fakl4-1.fna.fbcdn.net/vp/46471135a992b3065fd6d9703b7b03d4/5ACEC907/t50.2886-16/29014116_157494074932674_2719175251438075904_n.mp4'

  return videoFunctions.getUrl(shortcode)
    .then(actual => {
      expect(actual).toEqual(expected)
    })
})

test('callJSDOM returns a link', () => {
  const url = 'https://www.instagram.com/p/Bge6CgOAih3/'

  const expected = 'https://instagram.fakl4-1.fna.fbcdn.net/vp/46471135a992b3065fd6d9703b7b03d4/5ACEC907/t50.2886-16/29014116_157494074932674_2719175251438075904_n.mp4'

  return videoFunctions.callJSDom(url)
    .then(actual => {
      expect(actual).toEqual(expected)
    })
})

test('getVideoShortCodes returns an array of shortcodes', () => {
  const tagLink = 'https://www.instagram.com/explore/tags/johnlemmon/'

  const expected = [
    'Bge6CgOAih3',
    'BfjfoGKFHsh',
    'Ba76Vyelmdf'
  ]

  return videoFunctions.getVideoShortCodes(tagLink)
    .then(actual => {
      expect(actual).toEqual(expected)
    })
})
