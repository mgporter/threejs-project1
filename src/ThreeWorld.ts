import { AxesHelper, Camera, GridHelper, Object3D, OrthographicCamera, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { MyPerspectiveCamera } from "./three_components/MyPerspectiveCamera";
import { MyScene } from "./three_components/MyScene";
import { Resizer } from "./three_systems/Resizer";
import { GrassCube } from "./three_components/GrassCube";
import { Lights } from "./three_components/Lights";
import { MyOrbitControls } from "./three_systems/MyOrbitControls";
import { Loop } from "./three_systems/Loop";
import { PondCube } from "./three_components/PondCube";
import { MouseEvents } from "./three_systems/MouseEvents";

import { NoiseMaker } from "./three_systems/NoiseMaker";
import { FoundationCube } from "./three_components/FoundationCube";
import { MyFlyControls } from "./three_systems/MyFlyControls";
import { SelectableObject3D } from "./types";
import { MouseSelectRect } from "./three_systems/MouseSelectRect";
import { SelectableMesh } from "./three_components/SelectableMesh";

class ThreeWorld {

  #zSize;
  #xSize;
  #camera: Camera;
  #scene: Scene;
  #renderer;
  #loop;
  #selectRect;
  #selectables: SelectableMesh[];
  #noiseMaker;

  constructor(container: HTMLElement) {

    this.#zSize = 18;
    this.#xSize = 12;
    this.#camera = new MyPerspectiveCamera(35, 1, 0.1, 100);
    // this.#camera = new OrthographicCamera(100,100,100,100, 0.1, 100);
    this.#scene = new MyScene();
    this.#renderer = new WebGLRenderer({antialias: true});
    this.#noiseMaker = new NoiseMaker(this.#zSize, this.#xSize);
    this.#selectRect = new MouseSelectRect(this.#camera, this.#renderer.domElement);
    this.#selectables = [];

    container.append(this.#renderer.domElement);

    const directionalLight = Lights.createDirectionalLight();
    const ambientLight = Lights.createAmbientLight();

    // Add initial elements
    this.#scene.add(
      this.#camera,
      directionalLight,
      ambientLight,
      // new AxesHelper(4),
      // new GridHelper()
    )

    // Generate world cubes
    const perlinGrid = this.#noiseMaker.generatePerlinGrid();
    const pondThreshold = this.#noiseMaker.getNumberAtPercentile(20);

    for (let i = 0; i < perlinGrid.length; i++) {
      for (let j = 0; j < perlinGrid[0].length; j++) {
        const value = perlinGrid[i][j];

        const cube = (value <= pondThreshold) ?
          new PondCube(1, 1, new Vector3(j, 0, i)) : 
          new GrassCube(1, 1, new Vector3(j, 0, i));

        cube.position.x = j;
        cube.position.z = i;
        this.#scene.add(cube);
        this.#selectables.push(cube.getOutsideMesh());

        if (i === 0 || 
          i === perlinGrid.length - 1 ||
          j === 0 ||
          j === perlinGrid[0].length - 1) {
            const foundation = new FoundationCube(1, 1, new Vector3(j, -1, i));
            foundation.position.set(j, -1, i);
            this.#scene.add(foundation);
          }

      }
    }


    const resizer = new Resizer(container, this.#camera, this.#renderer);
    resizer.onResize = () => this.render();

    // const orbitControls = new MyOrbitControls(this.#camera, this.#renderer.domElement, grassCube1);
    // orbitControls.addEventListener("change", () => {
    //   this.render();
    // })

    const flyControls = new MyFlyControls(
      this.#camera, 
      this.#renderer.domElement, 
      {length: this.#zSize, width: this.#xSize}
    );

    this.#selectRect.setObjectsArray(this.#selectables);

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, flyControls);

    
  }

  addHelperObjects() {
    this.#scene.add(
      new AxesHelper(5),
      new GridHelper(10, 10)
    );
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }

}

export { ThreeWorld };