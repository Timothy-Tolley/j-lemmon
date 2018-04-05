import React from 'react'
import ThreeD from './ThreeD/ThreeD'

class App extends React.Component {
  render () {
    return (
      <div className = 'page'>
        <canvas id = 'myCanvas'>
        </canvas>
        <ThreeD />
      </div>
    )
  }
}

export default App
