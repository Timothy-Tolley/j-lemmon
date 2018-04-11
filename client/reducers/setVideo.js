import {SET_VIDEO} from '../actions/setVideo'

const initialState = {videoLink: 'https://instagram.fakl4-1.fna.fbcdn.net/vp/56b700375bba6d9f21053b094080da52/5ACCD8B6/t50.2886-16/30534684_218361128916261_1264147379318161408_n.mp4'}

export default function setVideo (state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO:
      return {
        ...state,
        videoLink: action.videoLink
      }
    default:
      return state
  }
}
