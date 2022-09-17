import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.module.min.js";

// Return a promise that resolves on texture load (using callback provided to loaded.load)
const getTexture = url => {
  const loader = new THREE.TextureLoader();
  return new Promise(resolve => {
    loader.load(url, texture => resolve(texture));
  });
};

// Get the loaded texture from each resource provided and return the MeshBasicMaterial created with them
const getMaterials = async () => {
  const textures = await Promise.all(
    [
      "/images/die1.png",
      "/images/die2.png",
      "/images/die3.png",
      "/images/die4.png",
      "/images/die5.png",
      "/images/die6.png",
    ].map(url => getTexture(url))
  );
  return textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
};

// Create a cube!
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3, 1, 1, 1);

// A map to the rotation required on each axis to land on the given face
const displayRoll = {
  1: {
    x: 0,
    y: (Math.PI * 3) / 2,
    z: 0,
  },
  2: {
    x: 0,
    y: (Math.PI * 1) / 2,
    z: 0,
  },
  3: {
    x: (Math.PI * 1) / 2,
    y: 0,
    z: 0,
  },
  4: {
    x: (Math.PI * 3) / 2,
    y: 0,
    z: 0,
  },
  5: {
    x: 0,
    y: 0,
    z: 0,
  },
  6: {
    x: 0,
    y: Math.PI,
    z: 0,
  },
};

// Perform the dice rolling animation
function animate(finishTime, dice, display, scene, camera, renderer) {
  let timeRemaining = finishTime - Date.now();
  if (timeRemaining < 0) return;
  requestAnimationFrame(() =>
    animate(finishTime, dice, display, scene, camera, renderer)
  );
  // Multiplier should work towards zero on each iteration as timeRemaining moves to zero
  // It should also move on an exponential scale, slowing as it reaches zero to show dice slowing down as they near the end of their roll
  const multiplier = Math.pow(timeRemaining / 750, Math.E);
  // As the multiplier moves towards zero, the final result of each rotation will be what is mapped for the particular dice face desired
  dice.rotation.x = display.x + Math.sin(multiplier / 3);
  dice.rotation.y = display.y - multiplier / 1.5;
  dice.rotation.z = display.z + (multiplier * 1) / 3;
  // Perform the render
  renderer.render(scene, camera);
}

// Use closure to return function for rolling dice in main application
// Call with a desired number to show and duration of roll
const rollDice = (dice, scene, camera, renderer) => {
  return (number, duration = 2000) => {
    if (Number.isNaN(number) || number < 1 || number > 6) return;
    const finishTime = Date.now() + duration;
    animate(finishTime, dice, displayRoll[number], scene, camera, renderer);
  };
};

const pushBackwards = (dice, scene, camera, renderer) => {
  return () => {
    console.log("pushing backwards");
  };
};

const onResize = (div, scene, camera, renderer) => {
  return () => {
    renderer.setSize(div.clientWidth, div.clientHeight);
    requestAnimationFrame(() => {
      renderer.render(scene, camera);
    });
  };
};

// Initialise the scene and dice
// Return an object with controls for the dice and a reference to the element holding it
const initDice = async element => {
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1500);
  const scene = new THREE.Scene();
  const materials = await getMaterials();
  const dice = new THREE.Mesh(cubeGeometry, materials);
  camera.position.z = 6;
  renderer.setSize(element.clientWidth, element.clientHeight);
  scene.add(dice);
  scene.background = new THREE.Color("rgb(255, 255, 255)");
  element.appendChild(renderer.domElement);
  renderer.render(scene, camera);
  return {
    rollDice: rollDice(dice, scene, camera, renderer),
    pushBackwards: pushBackwards(dice, scene, camera, renderer),
    onResize: onResize(element, scene, camera, renderer),
    element,
  };
};

export default initDice;
