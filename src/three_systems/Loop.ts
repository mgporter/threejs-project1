import { Camera, Clock, Scene, WebGLRenderer } from "three";

interface Updatable {
  tick: (delta: number) => void;
}

class Loop {

  #updatables: Updatable[];
  #camera;
  #scene;
  #renderer;
  #clock;
  
  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.#updatables = [];
    this.#camera = camera;
    this.#scene = scene;
    this.#renderer = renderer;
    this.#clock = new Clock();
  }

  addUpdatable(obj: Updatable) {
    this.#updatables.push(obj);
  }

  start() {
    this.#renderer.setAnimationLoop(() => {
      this.#animate();
      this.#renderer.render(this.#scene, this.#camera);
    })
  }

  stop() {
    this.#renderer.setAnimationLoop(null);
  }

  #animate() {
    const delta = this.#clock.getDelta();
    for (let obj of this.#updatables) {
      obj.tick(delta);
    }
  }

}

export { Loop };