// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/MTLLoader.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0x131313);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 150;

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 7;

//LIGHTS
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 40, 25);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 70;
scene.add(spotLight);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(0, -40, -25);
spotLight2.castShadow = true;
spotLight2.shadow.mapSize.width = 1024;
spotLight2.shadow.mapSize.height = 1024;
spotLight2.shadow.camera.near = 500;
spotLight2.shadow.camera.far = 4000;
spotLight2.shadow.camera.fov = 70;
scene.add(spotLight2);

// OBJECT
const loader = new OBJLoader();
const mtlLoader = new MTLLoader();
let card;
mtlLoader.load("./card.mtl", (materials) => {
  materials.preload();
  loader.setMaterials(materials);
  loader.load("./card.obj", (object) => {
    card = object;
    card.rotateX(Math.PI / 2);
    card.scale.set(13, 13, 13);
    scene.add(card);
  });
});

// LOAD MANAGER
// Load Manager
const manager = new THREE.LoadingManager();
manager.onStart = (url, itemsLoaded, itemsTotal) => {
  document.getElementById("loader").style.display = "flex";
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  document.getElementById(
    "progressLoading"
  ).innerText = `Loading Files ... ${itemsLoaded}/${itemsTotal}`;
};

manager.onLoad = () => {
  document.getElementById("loader").style.display = "none";
};

manager.onError = function (url) {
  alert("There was an error loading " + url);
};

function selectCardColor(e) {
  card.children[0].material = new THREE.MeshPhongMaterial({
    color: e.target.value,
  });
  document.getElementById("colorPicker").value = e.target.value;
}

function selectTextColor(e) {
  current.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevNum.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevTitle.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevDetails.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevAddress.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevSocial.material = new THREE.MeshBasicMaterial({ color: e.target.value });
  prevEmail.material = new THREE.MeshBasicMaterial({ color: e.target.value });



  document.getElementById("textColorPicker").value = e.target.value;
}

function setRotation() {
  controls.autoRotate = !controls.autoRotate;
}

function toggleModal() {
  let cardInfoContainerRef =
    document.getElementsByClassName("cardInfoContainer")[0];
  let openModalBtnRef = document.getElementsByClassName("openModalBtn")[0];
  if (openModalBtnRef.style.display === "none") {
    cardInfoContainerRef.style.display = "none";
    openModalBtnRef.style.display = "flex";
  } else {
    cardInfoContainerRef.style.display = "flex";
    openModalBtnRef.style.display = "none";
  }
}

const floader = new THREE.FontLoader();
let current;
function createName(name = "YOUR NAME") {
  if (current) {
    scene.remove(current);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(name, {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -15, 1);
    current = mesh;
    scene.add(current);
  });
}
createName();

let prevTitle;
function createTitle(job_title = "Your Title") {
  if (prevTitle) {
    scene.remove(prevTitle);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(job_title, {
      font: font,
      size: 2,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(-30, -10, 1);
    prevTitle = mesh;
    scene.add(prevTitle);
  });
}

let prevDetails;
function createdetails(details = "") {
  if (prevDetails) {
    scene.remove(prevDetails);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(details, {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(15, -3, 1);
    prevDetails = mesh;
    scene.add(prevDetails);
  });
}

let prevSocial;
function createSocial(social = "") {
  if (prevSocial) {
    scene.remove(prevSocial);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(social, {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(15, -6, 1);
    prevSocial = mesh;
    scene.add(prevSocial);
  });
}

let prevEmail;
function createEmail(Email = "") {
  if (prevEmail) {
    scene.remove(prevEmail);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(Email, {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(2, -9, 1);
    prevEmail = mesh;
    scene.add(prevEmail);
  });
}

let prevWebsite;
function createWebsite(website = "") {
  if (prevWebsite) {
    scene.remove(prevWebsite);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(website, {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(7, -12, 1);
    prevWebsite = mesh;
    scene.add(prevWebsite);
  });
}


let prevAddress;
function createAddress(Address = "Your Address") {
  if (prevAddress) {
    scene.remove(prevAddress);
  }
  floader.load("./font.json", function (font) {
    const geometry2 = new THREE.TextGeometry(Address, {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 21,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 10,
    });
    const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const mesh = new THREE.Mesh(geometry2, materials2);
    mesh.position.set(10, -15, 1);
    prevAddress = mesh;
    scene.add(prevAddress);
  });
}


// let prevWebsite;
// function createWebsite(website = "") {
//   if (prevWebsite) {
//     scene.remove(prevWebsite);
//   }
//   floader.load("./font.json", function (font) {
//     const geometry2 = new THREE.TextGeometry(website, {
//       font: font,
//       size: 2,
//       height: 0.5,
//       curveSegments: 21,
//       bevelEnabled: false,
//       bevelThickness: 1,
//       bevelSize: 1,
//       bevelOffset: 0,
//       bevelSegments: 10,
//     });
//     const materials2 = new THREE.MeshBasicMaterial({ color: 0xfafafa });
//     const mesh = new THREE.Mesh(geometry2, materials2);
//     mesh.position.set(-2, -17, -1);
//     mesh.rotateY(Math.PI);
//     prevWebsite = mesh;
//     scene.add(prevWebsite);
//   });
// }

//RENDER LOOP
requestAnimationFrame(render);
function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// Event Listeners
document.getElementById("name").addEventListener("change", (e) => {
  createName(e.target.value);
});

document.getElementById("title").addEventListener("change", (e) => {
  createTitle(e.target.value);
});

document.getElementById("details").addEventListener("change", (e) => {
  createdetails(e.target.value);
});

document.getElementById("social").addEventListener("change", (e) => {
  createSocial(e.target.value);
});

document.getElementById("website").addEventListener("change", (e) => {
  createWebsite(e.target.value);
});

document.getElementById("Email").addEventListener("change", (e) => {
  createEmail(e.target.value);
});

document.getElementById("Address").addEventListener("change", (e) => {
  createAddress(e.target.value);
});

document
  .getElementById("colorPicker")
  .addEventListener("change", selectCardColor);

document
  .getElementById("textColorPicker")
  .addEventListener("change", selectTextColor);

document.getElementById("rotateCard").addEventListener("change", setRotation);

document.getElementById("confirm").addEventListener("click", toggleModal);

document
  .getElementsByClassName("openModalBtn")[0]
  .addEventListener("click", toggleModal);
