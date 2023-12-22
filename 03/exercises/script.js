import * as Three from "three";

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: 800,
  height: 600,
};

const scene = new Three.Scene();
const cube = new Three.BoxGeometry(1, 1, 1);
const sphere = new Three.SphereGeometry(1, 32, 32);

const yellow = new Three.MeshBasicMaterial({
  color: 0xffff00,
});

const sphereMeshMaterial = new Three.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
});
console.log(
  "🚀 ~ file: script.js:22 ~ sphereMeshMaterial:",
  sphereMeshMaterial.color.r
);

const mesh = new Three.Mesh(cube, yellow);
const sphereMesh = new Three.Mesh(sphere, sphereMeshMaterial);
sphereMesh.position.x = 2;
scene.add(mesh);
scene.add(sphereMesh);

const camera = new Three.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
scene.add(camera);
camera.position.z = 7;
camera.position.y = 1;
camera.position.x = 3;

const renderer = new Three.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

let up = true;
const order = ["r", "g", "b"];
let index = 0;

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.02;
  mesh.rotation.x += 0.01;

  sphereMesh.rotation.y += 0.02;
  sphereMesh.rotation.x += 0.01;

  const currentColor = sphereMeshMaterial.color[order[index % order.length]];
  const addition = up ? 0.01 : -0.01;
  const newColor = currentColor + addition;
  sphereMeshMaterial.color[order[index % order.length]] = newColor;
  if (newColor > 1) {
    up = false;
  }
  if (newColor < 0) {
    up = true;
    index++;
  }

  renderer.render(scene, camera);
}
animate();
