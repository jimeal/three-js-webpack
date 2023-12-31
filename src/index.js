import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  //코드작성
  //장면
  const scene = new THREE.Scene()
  //장면 색상
  scene.background = new THREE.Color(0xffffff);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //어디에 어떤 코드에 출력할건지
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls( camera, renderer.domElement );

  controls.update();


  //빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)

  scene.add(pointLight)

  //texture
  const textureLoader =  new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load('../static/img/Abstract_010_basecolor.jpg')
  const textureNormalMap = textureLoader.load('../static/img/Abstract_010_normal.jpg')
  const textureHeight = textureLoader.load('../static/img/Abstract_010_height.png')
  const textureRoughnessMap = textureLoader.load('../static/img/Abstract_010_roughness.jpg')

  //매쉬
  // const boxWidth = 1;
  // const boxHeight = 1
  // const boxDepth = 1;
  // const geometry01 = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
  const geometry = new THREE.SphereGeometry(0.3, 32, 16)
  const material01 = new THREE.MeshStandardMaterial({ 
    map: textureBaseColor,
  })
  const obj01 = new THREE.Mesh(geometry, material01)
  scene.add(obj01)

  obj01.position.x = -2;
  
  const material02 = new THREE.MeshStandardMaterial({ 
    map: textureBaseColor,
    normalMap: textureNormalMap,
    //color: 0xff7f00,
    // metalness: 1,
    // roughness: 0.5,
    // transparent: false,
    // opacity: 0.7,
    // wireframe: true
  })

  //material01.wireframe = true
  const obj02 = new THREE.Mesh(geometry, material02)
  scene.add(obj02)
  obj02.position.x = -1;

  const material03 = new THREE.MeshStandardMaterial({ 
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeight,
    displacementScale: 0.1
    //color: 0xff7f00,
    // clearcoat: 1,
    // clearcoatRoughness: 0.1
  })
  const obj03 = new THREE.Mesh(geometry, material03)
  scene.add(obj03)

  obj03.position.x = 0;
  
  const material04 = new THREE.MeshStandardMaterial({ 
    //color: 0xff7f00,
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeight,
    displacementScale: 0.1,
    roughnessMap: textureRoughnessMap,
    roughness: 0.8
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  scene.add(obj04)

  obj04.position.x = 1;
  
  // const material05 = new THREE.MeshPhongMaterial({ 
  //   color: 0xff7f00,
  //   shininess: 60,
  //   specular: 0x004fff
  // })
  // const obj05 = new THREE.Mesh(geometry, material05)
  // scene.add(obj05)

  //obj05.position.x = 2;
  
  //애니메이션 적용 코드
  function render(time) {
    time *= 0.001;  
    
    // obj01.rotation.x = time;
    obj01.rotation.y = time;
    // obj02.rotation.x = time;
    obj02.rotation.y = time;
    // obj03.rotation.x = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    //obj05.rotation.y = time;
    
    requestAnimationFrame(render)
    renderer.render(scene, camera);
    controls.update();

  }
  
  requestAnimationFrame(render)
  // renderer.resnder(scene, camera);
  //반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
