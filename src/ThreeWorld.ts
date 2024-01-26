import { AxesHelper, Camera, GridHelper, Scene, WebGLRenderer } from "three";
import { MyPerspectiveCamera } from "./three_components/MyPerspectiveCamera";
import { MyScene } from "./three_components/MyScene";
import { Resizer } from "./three_systems/Resizer";
import { GrassCube } from "./three_components/GrassCube";
import { Lights } from "./three_components/Lights";
import { MyOrbitControls } from "./three_systems/MyOrbitControls";
import { Loop } from "./three_systems/Loop";
import { PondCube } from "./three_components/PondCube";


class ThreeWorld {

  #camera: Camera;
  #scene: Scene;
  #renderer;
  #loop;

  constructor(container: HTMLElement) {

    this.#camera = new MyPerspectiveCamera(35, 1, 0.1, 100);
    this.#scene = new MyScene();
    this.#renderer = new WebGLRenderer({antialias: true});
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);

    container.append(this.#renderer.domElement);

    const grassCube1 = new PondCube(1, 1);
    const directionalLight = Lights.createDirectionalLight();
    const ambientLight = Lights.createAmbientLight();

    this.#scene.add(
      this.#camera,
      directionalLight,
      ambientLight,
      new AxesHelper(),
      new GridHelper(),
    )

    // this.#loop.addUpdatable(grassCube1);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const cube = grassCube1.clone();
        cube.position.x = j;
        cube.position.z = i;
        this.#scene.add(cube);
      }
    }

    const resizer = new Resizer(container, this.#camera, this.#renderer);
    resizer.onResize = () => this.render();

    const orbitControls = new MyOrbitControls(this.#camera, this.#renderer.domElement, grassCube1);
    // orbitControls.addEventListener("change", () => {
    //   this.render();
    // })

    
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