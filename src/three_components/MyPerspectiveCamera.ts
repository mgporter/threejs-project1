import { PerspectiveCamera } from "three";

class MyPerspectiveCamera extends PerspectiveCamera {

  constructor(fov: number, aspect: number, near: number, far: number) {
    super(fov, aspect, near, far);
    this.position.set(0,0,10);
  }

}

export { MyPerspectiveCamera };