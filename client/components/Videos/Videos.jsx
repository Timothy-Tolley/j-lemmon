import React from 'react'
import request from 'superagent'
import {connect} from 'react-redux'

import './videos.css'
import {setVideo} from '../../actions/setVideo'

class Videos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videoLinks: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount () {
    request
      .get('/api/v1/videoLinks')
      .then(res => {
        this.setState({
          videoLinks: res.body
        })
      })
  }

  handleClick (e) {
    this.props.dispatch(setVideo(e.target.src))
  }

  render () {
    return (
      <div className = 'videosContainer'>
        {this.state.videoLinks.map((videoLink, idx) => {
          return (
            <video src = {videoLink} key = {idx} onClick = {this.handleClick} className = 'instaVids' autoPlay = {true} muted = {true}/>
          )
        })}
      </div>
    )
  }
}

export default connect()(Videos)
