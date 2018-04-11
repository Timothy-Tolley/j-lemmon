import * as THREE from 'three'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import OrbitControls from 'orbit-controls-es6'

class ThreeD extends Component {
  constructor (props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.checkForVideo = this.checkForVideo.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  componentDidMount () {
    // const width = this.mount.clientWidth
    // const height = this.mount.clientHeight
    const myCanvas = document.getElementById('myCanvas')

    // cubemap
    const path = '/images/'
    const format = '.png'
    const urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ]
    const reflectionCube = new THREE.CubeTextureLoader().load(urls)
    reflectionCube.format = THREE.RGBFormat
    const refractionCube = new THREE.CubeTextureLoader().load(path)
    refractionCube.mapping = THREE.CubeRefractionMapping
    refractionCube.format = THREE.RGBFormat

    // scene
    const scene = new THREE.Scene()
    scene.background = reflectionCube
    scene.fog = new THREE.FogExp2(0xCCCFFF, 0.05, 100)

    // camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      5000
    )
    camera.position.z = 8
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: myCanvas,
      preserveDrawingBuffer: true
    })
    renderer.setClearColor('#ffffff')
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.autoClearColor = false

    // model loader
    const loader = new THREE.JSONLoader()
    loader.load('/models/head.json', this.handleLoad)

    // light1
    const light = new THREE.DirectionalLight(0xffffff, 2.0, 600)
    light.position.y = 50
    light.position.x = 50
    scene.add(light)
    // light2
    const light2 = new THREE.DirectionalLight(0xffffff, 2.0, 600)
    light2.position.y = -50
    light2.position.x = -50
    scene.add(light2)
    // // ambient Light
    // const ambient = new THREE.AmbientLight(0xffffff)
    // scene.add(ambient)

    // window resizing
    window.addEventListener('resize', this.onWindowResize, false)

    // regular texture
    const regMaterial = new THREE.MeshPhongMaterial({color: 'grey', shininess: 30})

    // Video texture
    const video = document.createElement('video')
    video.src = this.props.videoLink
    video.setAttribute('crossorigin', 'anonymous')
    video.autoplay = true
    video.load()
    video.play()
    const videoTexture = new THREE.VideoTexture(video)
    videoTexture.minFilter = THREE.LinearFilter
    videoTexture.magFilter = THREE.LinearFilter
    videoTexture.format = THREE.RGBFormat
    const movieMaterial = new THREE.MeshPhongMaterial({map: videoTexture, overdraw: true, side: THREE.DoubleSide})
    movieMaterial.map.needsUpdate = true

    // controls
    this.controls = new OrbitControls(camera)
    this.controls.rotateSpeed = 2
    this.controls.zoomSpeed = 2
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.3
    this.controls.enableRotate = true
    this.controls.enableZoom = true
    this.controls.enablePan = false
    this.controls.minPolarAngle = Math.PI / 4
    this.controls.maxPolarAngle = Math.PI / 1.5
    this.controls.target.set(0, 0, 0)

    // attachments
    this.video = video
    this.scene = scene
    this.camera = camera
    this.loader = loader
    this.renderer = renderer
    this.movieMaterial = movieMaterial
    this.checkedMovieMaterial = this.checkForVideo(video, movieMaterial)
    this.regMaterial = regMaterial

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  onWindowResize (event) {
    const windowHeight = window.innerHeight
    const tanFOV = Math.tan(((Math.PI / 180) * this.camera.fov / 2))
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.fov = (360 / Math.PI) * Math.atan(tanFOV * (window.innerHeight / windowHeight))
    this.camera.updateProjectionMatrix()
    this.camera.lookAt(this.scene.position)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.render(this.scene, this.camera)
  }

  componentWillUnmount () {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  checkForVideo (video, movieMaterial) {
    if (video.src !== 'http://localhost:3000/undefined') {
      return movieMaterial
    } else return null
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.videoLink !== nextProps.videoLink) {
      this.video.src = nextProps.videoLink
      this.mesh.needsUpdate = true
      // this.componentDidMount()
    }
  }

  handleLoad (geometry, materials) {
    const mesh = new THREE.Mesh(geometry, this.checkedMovieMaterial || this.regMaterial)
    this.mesh = mesh
    this.scene.add(this.mesh)
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
    this.controls.update()
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene () {
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return (
      <div className = 'canvasDiv'
        style={{width: '600px', height: '600px'}}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    videoLink: state.setVideo.videoLink
  }
}

export default connect(mapStateToProps)(ThreeD)
