import { AxesHelper, Camera, GridHelper, Object3D, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
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


class ThreeWorld {

  #length;
  #width;
  #camera: Camera;
  #scene: Scene;
  #renderer;
  #loop;
  #mouseEvents;
  #selectableGroundObjects: Object3D[];
  #noiseMaker;

  constructor(container: HTMLElement) {

    this.#length = 18;
    this.#width = 12;
    this.#camera = new MyPerspectiveCamera(35, 1, 0.1, 100);
    // this.#camera = new OrthographicCamera(100,100,100,100, 0.1, 100);
    this.#scene = new MyScene();
    this.#renderer = new WebGLRenderer({antialias: true});
    this.#noiseMaker = new NoiseMaker(this.#length, this.#width);
    this.#mouseEvents = new MouseEvents(this.#camera, this.#renderer.domElement);
    this.#selectableGroundObjects = [];

    container.append(this.#renderer.domElement);

    const grassCube1 = new GrassCube(1, 1);
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
          new PondCube(1,1) : new GrassCube(1,1);
        cube.position.x = j;
        cube.position.z = i;
        this.#scene.add(cube);
        this.#selectableGroundObjects.push(cube);

        if (i === 0 || 
          i === perlinGrid.length - 1 ||
          j === 0 ||
          j === perlinGrid[0].length - 1) {
            const foundation = new FoundationCube(1,1);
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
      {length: this.#length, width: this.#width}
    );

    this.#mouseEvents.setObjectsArray(this.#selectableGroundObjects);

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