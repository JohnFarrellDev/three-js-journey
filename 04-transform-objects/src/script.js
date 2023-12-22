import * as THREE from "three";

// we can adjust the position, scale, size and quaternion of an object

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// sometimes you want to apply a scale/ rotation or position change to a lot of different elements
// you can put all the objects inside a Group using the Group class and moving them all
// this makes it easy to move all the elements that are intrinsically linked such as the components that make up a house (doors and windows)

const group = new THREE.Group();
scene.add(group);

const spheres = new Array(3).fill(null).map(() => {
  const sphere = new THREE.SphereGeometry(1, 32, 32);
  const yellow = new THREE.MeshBasicMaterial({
    color: 0xffff00,
  });
  const mesh = new THREE.Mesh(sphere, yellow);
  mesh.position.x = (Math.random() - 0.8) * 10;
  mesh.position.y = (Math.random() - 0.8) * 10;
  mesh.position.z = (Math.random() - 0.8) * 10;
  return mesh;
});

group.add(...spheres);

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 4;
mesh.position.y = -0.5;
mesh.position.z = -2;
scene.add(mesh);

// useful for debugging, red line is positive x, green is positive y, blue is positive z
// the length of the axes is 1 unit by default but can be adjusted
const axesHelper = new THREE.AxesHelper(2.5);
scene.add(axesHelper);

// normalizes the x,y and z position of the mesh to 1
mesh.position.normalize();

// distance between the centre of the scene and the mesh
console.log(
  "🚀 ~ file: script.js:22 ~ mesh.position.length()",
  mesh.position.length()
);

// you can update x, y and z all at the same time
mesh.position.set(2, -0.5, 1);

// scale also works on the x, y and z axis
mesh.scale.set(3, -1.5, 1);
// or set a single value
mesh.scale.x = 2;

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 2;

scene.add(camera);
// we can give the camera a Vector3 to look at but it can also look at any object that is a Vector3
camera.lookAt(mesh.position);

// you can also get the distance between any two positions that are Vector3
mesh.position.distanceTo(camera.position);
console.log(
  "🚀 ~ file: script.js:46 ~ mesh.position.distanceTo(camera.position):",
  mesh.position.distanceTo(camera.position)
);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  // this reorder creates a gimbal lock where the y rotation is not seen
  //   mesh.rotation.reorder("ZYX");

  // y rotation means rotating around the y axis, this means it actually spins in an x direction
  // a rotation of Math.PI is half a circle
  mesh.rotation.y += 0.02;
  //   mesh.rotation.x += 0.02;
  mesh.rotation.z += 0.02;

  // it is possible to enter a gimbal lock where one axis cannot be rotated freely
  // this is because the rotation is applied in an order and the way rotations are applied is relative to the current rotation
  // you can see the order that rotations are applied which can fix this.

  // one solution to avoid this problem is to use quaternions
  // you get the same outcome with different formulas

  group.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
