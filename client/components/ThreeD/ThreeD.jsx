import React, {Component} from 'react'
import * as THREE from 'three'

class ThreeD extends Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount () {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    const myCanvas = document.getElementById('myCanvas')

    // scene
    const scene = new THREE.Scene()
    // camera
    const camera = new THREE.PerspectiveCamera(
      35,
      width / height,
      0.1,
      1000
    )
    // renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: myCanvas
    })
    // loader
    const loader = new THREE.JSONLoader()
    loader.load('/models/head.json', this.handleLoad)

    // lighting
    const light = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(light)
    const light2 = new THREE.PointLight(0xffffff, 0.5)
    scene.add(light2)

    // material
    const material = new THREE.MeshStandardMaterial()

    camera.position.z = 4
    renderer.setClearColor('#000000')
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.material = material
    this.scene = scene
    this.camera = camera
    this.loader = loader
    this.renderer = renderer

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount () {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  handleLoad (geometry, materials) {
    const mesh = new THREE.Mesh(geometry, this.material)
    this.scene.add(mesh)
    mesh.position.z = -5
    return mesh
  }

  start () {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop () {
    cancelAnimationFrame(this.frameId)
  }

  animate () {
    // this.mesh.rotation.x = -0.1
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene () {
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return (
      <div
        style={{width: '600px', height: '600px'}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default ThreeD
