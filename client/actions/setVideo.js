export const SET_VIDEO = 'SET_VIDEO'

export function setVideo (videoLink) {
  return {
    type: SET_VIDEO,
    videoLink
  }
}
