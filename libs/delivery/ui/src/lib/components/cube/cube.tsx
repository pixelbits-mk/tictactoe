import { useEffect } from 'react'
import * as THREE from 'three'

function Cube() {
  useEffect(() => {
    // Create a scene
    var scene = new THREE.Scene()

    // Create a camera
    var camera = new THREE.PerspectiveCamera(25, 1, 1, 1000)
    camera.position.z = 5

    // Create a renderer
    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      alpha: true,
    })
    renderer.setClearColor(0x000000, 0) // The first parameter is the color, the second is the opacity (0-1)

    renderer.setSize(100, 100)

    // Create a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1)
    var materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
      new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
      new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
    ]

    var cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
    animate()

    // Render the scene
    function animate() {
      requestAnimationFrame(animate as FrameRequestCallback)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    return () => {
        scene.remove(cube)
        renderer.dispose()
    }
  }, [])

  return <canvas id="canvas"></canvas>
}

export default Cube
