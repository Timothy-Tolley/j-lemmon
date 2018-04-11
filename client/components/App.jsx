import React from 'react'
import ThreeD from './ThreeD/ThreeD'
import Videos from './Videos/Videos'
import Header from './Header/Header'

class App extends React.Component {
  render () {
    return (
      <div className = 'page'>
        <ThreeD />
        <canvas id = 'myCanvas'>
        </canvas>
        <Videos />
        <Header />
      </div>
    )
  }
}

export default App
